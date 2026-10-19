<script setup lang="ts">
// Электрическая кнопка «запуск игры»: WebGL-шейдер рисует золотые электро-дуги
// по периметру (ярче при наведении), а по клику кнопка стремительно заливается
// золотом и уводит на нужную страницу. Бело-золотая палитра — под стиль сайта.
// Портировано из идеи «Induction Button» (cyan → gold, React/iframe → Vue/canvas).
const props = withDefaults(defineProps<{
  label: string
  to: string
}>(), {})

const canvas = ref<HTMLCanvasElement | null>(null)
const filling = ref(false)
let cleanup: (() => void) | null = null
let fireFlash: (() => void) | null = null
let setHover: ((on: boolean) => void) | null = null

const reduced = () => typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function onClick() {
  if (filling.value) return
  filling.value = true
  if (reduced()) { navigateTo(props.to); return }
  fireFlash?.() // заряд → вспышка (в шейдере)
  window.setTimeout(() => navigateTo(props.to), 720)
}

onMounted(() => {
  const cv = canvas.value
  if (!cv) return
  const gl = cv.getContext('webgl', { alpha: true, antialias: true })
  if (!gl) return // без WebGL остаётся CSS-золотая кнопка (см. стили .eb--fallback)
  cv.closest('.eb')?.classList.remove('eb--fallback')

  const VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}'
  const FS = `
    precision highp float;
    uniform vec2 u_res;
    uniform float u_time;
    uniform float u_arcs;
    uniform float u_flash;
    uniform float u_charge;
    float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
    float noise(vec2 p){
      vec2 i=floor(p), f=fract(p);
      vec2 u=f*f*(3.0-2.0*f);
      return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x),
                 mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x),u.y);
    }
    float fbm(vec2 p){
      float v=0.0; float a=0.5;
      for(int i=0;i<4;i++){ v+=a*noise(p); p=p*2.05+vec2(9.7,3.1); a*=0.5; }
      return v;
    }
    float sdRBox(vec2 p, vec2 b, float r){
      vec2 q = abs(p) - b + r;
      return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
    }
    void main(){
      vec2 p = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
      float ar = u_res.x / u_res.y;
      vec2 hs = vec2(ar * 0.5 - 0.2, 0.5 - 0.2);
      float d = sdRBox(p, hs, 0.16);
      float t = u_time;
      float hover = clamp(u_arcs / 6.0, 0.0, 1.0);
      vec3 col = vec3(0.0);
      float plate = 1.0 - smoothstep(-0.004, 0.004, d);
      // Тёплая тёмная подложка кнопки
      vec3 plateCol = vec3(0.055, 0.047, 0.032);
      plateCol += vec3(0.032, 0.024, 0.010) * fbm(p * 9.0);
      plateCol += vec3(0.34, 0.25, 0.08) * exp(d * 9.0) * (0.25 + hover * 0.6);
      col = mix(col, plateCol, plate);
      col *= 1.0 + 0.5 * exp(-max(d, 0.0) * 16.0) * (1.0 - plate);
      float a = atan(p.y, p.x);
      vec3 arcCol = vec3(0.0);
      for (int i = 0; i < 6; i++) {
        float fi = float(i);
        float w = clamp(u_arcs - fi, 0.0, 1.0);
        float n1 = fbm(vec2(a * 2.4 + fi * 11.3, t * (1.6 + fi * 0.27) + fi * 53.1));
        float off = (n1 - 0.5) * (0.11 + u_flash * 0.1);
        float seg = smoothstep(0.35, 0.75, noise(vec2(a * 1.8 + fi * 7.7, t * (0.9 + fi * 0.13) + fi * 19.0)));
        seg = 0.3 + 0.7 * seg;
        float g = 0.0042 / (abs(d + off) + 0.006);
        // Золотые дуги + бело-золотое горячее ядро
        arcCol += (vec3(1.0, 0.80, 0.34) * g + vec3(1.0, 0.96, 0.82) * g * g * 0.6) * w * seg;
      }
      float outerMask = 1.0 - smoothstep(0.04, 0.15, d);
      col += arcCol * (0.6 + 0.4 * hover) * outerMask;
      // Заряд: золото накапливается и затапливает плашку, ярче у краёв (периметр)
      float edge = 0.4 + 0.6 * exp(d * 6.0);
      col += vec3(1.0, 0.84, 0.42) * u_charge * plate * edge * 1.5;
      col += vec3(1.0, 0.90, 0.65) * u_charge * u_charge * plate * 0.6;
      // Разряд-вспышка по периметру
      float ring = 0.006 / (abs(d) + 0.006);
      col += vec3(1.0, 0.95, 0.80) * ring * u_flash * 2.0 * outerMask;
      col += vec3(1.0, 0.92, 0.72) * u_flash * 0.22 * (outerMask + plate);
      gl_FragColor = vec4(col, plate + outerMask * (length(arcCol) + u_flash + u_charge));
    }
  `

  function compile(type: number, src: string) {
    const s = gl!.createShader(type)!
    gl!.shaderSource(s, src)
    gl!.compileShader(s)
    return s
  }
  const prog = gl.createProgram()!
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS))
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS))
  gl.linkProgram(prog)
  gl.useProgram(prog)

  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const locP = gl.getAttribLocation(prog, 'p')
  gl.enableVertexAttribArray(locP)
  gl.vertexAttribPointer(locP, 2, gl.FLOAT, false, 0, 0)
  gl.enable(gl.BLEND)
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

  const uRes = gl.getUniformLocation(prog, 'u_res')
  const uTime = gl.getUniformLocation(prog, 'u_time')
  const uArcs = gl.getUniformLocation(prog, 'u_arcs')
  const uFlash = gl.getUniformLocation(prog, 'u_flash')
  const uCharge = gl.getUniformLocation(prog, 'u_charge')

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = Math.max(1, Math.round(cv!.clientWidth * dpr))
    const h = Math.max(1, Math.round(cv!.clientHeight * dpr))
    if (cv!.width !== w || cv!.height !== h) {
      cv!.width = w; cv!.height = h
      gl!.viewport(0, 0, w, h)
    }
  }
  window.addEventListener('resize', resize)
  resize()

  const isReduced = reduced()
  let arcs = 2.4, arcsTarget = 2.4, flash = 0, crawl = 0
  let charge = 0, charging = false, flashed = false
  let last = performance.now()
  let raf = 0

  setHover = (on: boolean) => { if (!charging) arcsTarget = on ? 5.8 : 2.4 }
  // «Заряд и вспышка»: накапливаем свечение → на пике одиночный разряд
  fireFlash = () => { charging = true; arcsTarget = 6.0 }

  function frame(now: number) {
    const dt = Math.min(0.05, (now - last) / 1000)
    last = now
    arcs += (arcsTarget - arcs) * Math.min(1, dt * 5)
    if (charging) {
      charge = Math.min(1, charge + dt / 0.62) // накопление ~0.62с
      if (charge >= 0.92 && !flashed) { flash = 1; flashed = true }
    }
    flash *= Math.exp(-3.6 * dt)
    crawl += dt * (0.6 + (arcs / 6) * 1.1 + flash * 2.0 + charge * 1.5)
    resize()
    gl!.uniform2f(uRes, cv!.width, cv!.height)
    gl!.uniform1f(uTime, isReduced ? 3.0 : crawl)
    gl!.uniform1f(uArcs, arcs)
    gl!.uniform1f(uFlash, flash)
    gl!.uniform1f(uCharge, charge)
    gl!.drawArrays(gl!.TRIANGLES, 0, 3)
    raf = requestAnimationFrame(frame)
  }
  raf = requestAnimationFrame(frame)

  cleanup = () => {
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', resize)
  }
})

onBeforeUnmount(() => cleanup?.())
</script>

<template>
  <button
    type="button"
    class="eb eb--fallback"
    :class="{ 'is-filling': filling }"
    :aria-label="label"
    @click="onClick"
    @mouseenter="setHover?.(true)"
    @mouseleave="setHover?.(false)"
    @focus="setHover?.(true)"
    @blur="setHover?.(false)"
  >
    <canvas ref="canvas" class="eb__gl" aria-hidden="true" />
    <span class="eb__label">{{ label }}</span>
  </button>
</template>

<style scoped>
.eb {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: clamp(240px, 72vw, 300px);
  height: 92px;
  padding: 0;
  border: none;
  border-radius: 18px;
  background: transparent;
  cursor: pointer;
  overflow: hidden;
  isolation: isolate;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.22s cubic-bezier(0.34, 1.4, 0.5, 1);
}
.eb:hover { transform: translateY(-2px); }
.eb:active { transform: translateY(1px) scale(0.99); }
/* Без рамки/halo на фокусе — индикацию даёт сам электрический эффект (дуги) */
.eb:focus,
.eb:focus-visible { outline: none; box-shadow: none; }

.eb__gl {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  border-radius: inherit;
  z-index: 0;
}

.eb__label {
  position: relative;
  z-index: 2;
  pointer-events: none;
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.28em;
  text-indent: 0.28em;
  text-transform: uppercase;
  color: #fff6e0;
  text-shadow: 0 0 14px rgba(230, 200, 102, 0.7), 0 1px 4px rgba(0, 0, 0, 0.85);
  transition: color 0.3s ease 0.4s, text-shadow 0.3s ease 0.4s;
}
.eb.is-filling .eb__label { color: #3a2a08; text-shadow: none; }

/* Фолбэк без WebGL: тёмная кнопка с золотой рамкой и свечением */
.eb--fallback {
  background: #15110a;
  box-shadow: inset 0 0 0 1.5px rgba(230, 200, 102, 0.6), 0 0 24px rgba(230, 200, 102, 0.25);
}

@media (prefers-reduced-motion: reduce) {
  .eb, .eb__fill, .eb__label { transition: none; }
}
</style>
