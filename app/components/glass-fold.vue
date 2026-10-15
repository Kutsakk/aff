<script setup lang="ts">
// Анимированный WebGL-фон «стеклянные складки» (порт GradFlow Glass Fold на Vue).
// Наши цвета: тёмный фон · золотые панели · бело-золотые светящиеся грани.
interface Props {
  /** Тело стеклянных панелей. */
  color1?: string
  /** Фон. */
  color2?: string
  /** Светящиеся грани. */
  color3?: string
  /** Скорость анимации. 0 — стоп. */
  speed?: number
  /** Плотность складок (больше — мельче и чаще). */
  scale?: number
  /** Зерно плёнки, 0–0.5. */
  noise?: number
}

const props = withDefaults(defineProps<Props>(), {
  color1: '#c9a84c', // золото
  color2: '#000000', // тьма
  color3: '#fff4d6', // бело-золотой свет
  speed: 0.45,
  scale: 1,
  noise: 0.1,
})

const VERTEX = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

const FRAGMENT = `
  precision highp float;

  uniform float u_time;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;
  uniform float u_scale;
  uniform float u_noise;
  uniform vec2 u_resolution;
  varying vec2 vUv;

  float grain(vec2 st) {
    return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453);
  }

  vec2 centered(vec2 uv) {
    vec2 p = uv - 0.5;
    p.x *= u_resolution.x / max(u_resolution.y, 1.0);
    return p;
  }

  mat2 rot(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat2(c, -s, s, c);
  }

  vec3 shade(vec2 uv, float time) {
    vec2 q = rot(0.6) * centered(uv) * 2.0 * u_scale;
    float t = time * 0.6;
    float pixel = 2.0 * u_scale / max(u_resolution.y, 1.0);

    vec3 color = mix(u_color2, u_color2 * 0.45, clamp(length(centered(uv)) * 1.3, 0.0, 1.0));

    for (int i = 0; i < 6; i++) {
      float fi = float(i);
      float bend = mod(fi, 2.0) * 2.0 - 1.0;

      float crease = (fi - 2.5) * 0.4
                   + 0.26 * sin(q.x * (1.05 + 0.12 * fi) + fi * 1.9 + t * (0.25 + 0.05 * fi))
                   + 0.1 * bend * q.x * q.x;
      float s = q.y - crease;
      float pane = smoothstep(-pixel, pixel, s);
      float back = max(s, 0.0);

      float body = exp(-back * 1.7);
      float fresnel = exp(-back * 8.0);
      float rim = exp(-back * 80.0);
      float inner = exp(-pow((back - 0.045) / 0.014, 2.0));
      float bloom = exp(-abs(s) * 20.0);

      vec3 tint = mix(u_color1, u_color3, clamp(fresnel * 0.6 + 0.08 + 0.14 * sin(fi * 2.1 + q.x * 0.8 + t * 0.2), 0.0, 1.0));
      vec3 light = tint * pane * (body * 0.42 + fresnel * 0.4)
                 + u_color3 * (pane * (rim * 0.6 + inner * 0.12) + bloom * 0.1);

      color += light * (1.0 - color);
    }

    return clamp(color, 0.0, 1.0);
  }

  void main() {
    vec3 color = shade(vUv, u_time);
    if (u_noise > 0.001) {
      float g = grain(vUv * 200.0 + u_time * 0.1);
      color *= 1.0 - u_noise * 0.4 + u_noise * g * 0.4;
    }
    gl_FragColor = vec4(color, 1.0);
  }
`

function hexToVec3(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h
  const n = parseInt(full, 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return shader
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
// цикл отрисовки читает актуальные пропсы отсюда — смена цвета не пересобирает программу
const live = ref({ ...props })
watchEffect(() => { live.value = { color1: props.color1, color2: props.color2, color3: props.color3, speed: props.speed, scale: props.scale, noise: props.noise } })

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false })
  if (!gl) return

  const program = gl.createProgram()!
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX))
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT))
  gl.linkProgram(program)
  gl.useProgram(program)

  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  )
  const position = gl.getAttribLocation(program, 'position')
  gl.enableVertexAttribArray(position)
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

  const uniform = (name: string) => gl.getUniformLocation(program, name)
  const u = {
    time: uniform('u_time'),
    color1: uniform('u_color1'),
    color2: uniform('u_color2'),
    color3: uniform('u_color3'),
    scale: uniform('u_scale'),
    noise: uniform('u_noise'),
    resolution: uniform('u_resolution'),
  }

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const width = Math.max(1, Math.round(canvas.clientWidth * dpr))
    const height = Math.max(1, Math.round(canvas.clientHeight * dpr))
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width
      canvas.height = height
    }
    gl.viewport(0, 0, width, height)
  }

  let elapsed = 0
  let last: number | null = null
  let frame = 0

  const draw = (now: number) => {
    const p = live.value
    if (last !== null) elapsed += Math.min((now - last) / 1000, 0.1) * p.speed
    last = now

    resize()
    gl.uniform1f(u.time, elapsed)
    gl.uniform3fv(u.color1, hexToVec3(p.color1))
    gl.uniform3fv(u.color2, hexToVec3(p.color2))
    gl.uniform3fv(u.color3, hexToVec3(p.color3))
    gl.uniform1f(u.scale, p.scale)
    gl.uniform1f(u.noise, p.noise)
    gl.uniform2f(u.resolution, canvas.width, canvas.height)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  }

  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const loop = (now: number) => {
    draw(now)
    if (!still) frame = requestAnimationFrame(loop)
  }
  frame = requestAnimationFrame(loop)

  const observer = new ResizeObserver(() => {
    if (still) draw(performance.now())
  })
  observer.observe(canvas)

  onBeforeUnmount(() => {
    cancelAnimationFrame(frame)
    observer.disconnect()
    gl.deleteBuffer(buffer)
    gl.deleteProgram(program)
  })
})
</script>

<template>
  <canvas ref="canvasRef" aria-hidden="true" class="glass-fold" />
</template>

<style scoped>
.glass-fold {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
