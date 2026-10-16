// Контент страницы «О нас» на трёх языках (ka/ru/en).
// Значения содержат inline-разметку (strong, grad-gold, bsb-red) — рендерятся через v-html.
// Бренды (названия команд, лиг, турниров) и латинские термины не переводятся.
import type { Locale } from './useLocale'

export interface AboutContent {
  heroTitle: string
  heroLead: string
  heroP2: string
  s2010: { h2: string, p: string[] }
  s2011: { h2: string, p: string[] }
  s2012: { h2: string, p: string[] }
  s2017: { h2: string, p1: string, p2: string, pWin: string }
  s2018: { h2: string, p1: string, p2: string }
  s2019: {
    h2: string, intro: string, teams: string[],
    sokhumiH3: string, sokhumiP: string, sokhumiNote: string,
    westernH3: string, westernP: string,
    steelersH3: string, steelersIntro: string, champsLabel: string,
  }
  s2020: { h2: string, p1: string, p2: string }
  s2021: { h2: string, p1: string, p2: string }
  flag: { h2: string, p1: string, p2: string }
  s2024: { h2: string, p1: string }
  bsb2025: { h2: string, p1: string, p2: string }
  bsb2026: { h2: string, p1: string, countries: string[], p2: string }
  tackle: { h2: string, p1: string, p2: string, lvl2: string[], p3: string }
  fixtures: { date1: string, place1: string, date2: string, place2: string, teams1: string, teams2: string }
  finale: { h2: string, p1: string, intro: string, p2: string, p3: string, p4: string, path: string }
}

const ka: AboutContent = {
  heroTitle: 'ამერიკული ფეხბურთის ისტორია საქართველოში',
  heroLead: 'ამერიკული ფეხბურთი საქართველოში ერთი კლუბის ან ერთი თაობის ისტორია არ არის. ეს ისტორია ენთუზიასტების პატარა თემიდან დაიწყო, თანდათან ეროვნულ სპორტულ სისტემად ჩამოყალიბდა, გაიარა ზრდის წლები, პანდემია და საკლუბო ფეხბურთის კრიზისი, შემდეგ კი საერთაშორისო ასპარეზზე გავიდა.',
  heroP2: 'დღეს საქართველოს ნაკრები საერთაშორისო ტურნირებში მონაწილეობს, თბილისში სხვადასხვა ქვეყნის გუნდები ჩამოდიან, საქართველო კი ისტორიაში პირველად შევიდა IFAF-ის ოფიციალურ ევროპულ tackle ციკლში. მაგრამ ამ გზას თხუთმეტ წელზე მეტი დასჭირდა.',
  s2010: {
    h2: '<span class="grad-gold">პირველი ნაბიჯები</span>: ფედერაციის დაარსებამდე',
    p: [
      'საქართველოში ამერიკული ფეხბურთის არსებობის ერთ-ერთი პირველი დოკუმენტური დადასტურება ჯერ კიდევ 2010 წელს მიეკუთვნება.',
      '2010 წლის 4 დეკემბერს თბილისში, თავართქილაძის სასწავლო დაწესებულების ხელოვნურ მოედანზე, გაიმართა ამერიკული ფეხბურთის სამეგობრო მატჩი ინგლისური ენის პედაგოგებსა და ამერიკელ საზღვაო ქვეითებს შორის.',
      'ეს ჯერ კიდევ არ იყო ეროვნული ჩემპიონატი ან სრულფასოვანი ქართული ლიგა, თუმცა ეს მატჩი აჩვენებს, რომ ამერიკული ფეხბურთისადმი ინტერესი საქართველოში ეროვნული ფედერაციის დაარსებამდეც არსებობდა.',
      'ამერიკელი სამხედროები მოგვიანებითაც აგრძელებდნენ ამ სპორტის განვითარებასთან დაკავშირებულ ღონისძიებებში მონაწილეობას. მაგალითად, 2014 წლის ივნისში თბილისში, სტადიონ „მერანზე“, გაიმართა flag football-ის მატჩი ამერიკელ საზღვაო ქვეითებსა და ქართულ გუნდს შორის.',
      'სწორედ ამ პერიოდში თანდათან ყალიბდებოდა ის გარემო, საიდანაც მოგვიანებით ამერიკული ფეხბურთის ორგანიზებული ქართული სისტემა გაჩნდა.',
    ],
  },
  s2011: {
    h2: '2011 — ამერიკული ფეხბურთის <span class="grad-gold">ფედერაციის დაარსება</span> საქართველოში',
    p: [
      'ქართული ამერიკული ფეხბურთის ისტორიის ნამდვილ ამოსავალ წერტილად 2011 წელი შეიძლება ჩაითვალოს.',
      'ამ წელს დაარსდა <strong>American Football Federation of Georgia</strong>. საერთაშორისო ფედერაცია IFAF 2011 წელს ქართული ფედერაციის დაარსების წლად მიუთითებს.',
      'ადრეულ ეტაპზე მოძრაობა სრულიად მცირე იყო. შემორჩენილი მასალების მიხედვით, თავიდან სულ ორი გუნდი არსებობდა — <strong>Crusaders</strong> და <strong>Grizzlies</strong>. მოთამაშეები და მწვრთნელები ცოდნასა და გამოცდილებას ქვეყნის გარეთ — ევროპასა და აშშ-ში — იღებდნენ.',
      'ამ პერიოდის ერთ-ერთი ცენტრალური ფიგურა იყო <strong>ამირან ქირია</strong>. საქართველოში დაბრუნებამდე ქირია რამდენიმე წელი რუსეთში თამაშობდა ამერიკულ ფეხბურთს. სამშობლოში დაბრუნებისას მან საქართველოსთვის ახალი სპორტის განვითარებას მოჰკიდა ხელი და ფედერაციის სათავეებთან მდგომი ერთ-ერთი მთავარი ადამიანი გახდა.',
      'ახალგაზრდა ფედერაციის წინაშე უდიდესი ამოცანა იდგა: ფაქტობრივად ნულიდან შეექმნა ამერიკული ფეხბურთის ინფრასტრუქტურა — ეპოვა მოთამაშეები, მოემზადებინა მწვრთნელები და მსაჯები, ჩამოეყალიბებინა გუნდები და მოეწყო შეჯიბრებები. ასე დაიწყო ქართული ამერიკული ფეხბურთის პირველი ორგანიზებული თავი.',
    ],
  },
  s2012: {
    h2: '2012–2016 — <span class="grad-gold">პირველი შეჯიბრებები და კლუბების გაჩენა</span>',
    p: [
      'ფედერაციის დაარსების შემდეგ პირველ წლებში ამერიკული ფეხბურთი თანდათან სცდებოდა ენთუზიასტების პატარა ჯგუფის ფარგლებს. უკვე 2012 წელს ქართული წყაროები მიმდინარე შეჯიბრებებს საქართველოს <strong>პირველ ჩემპიონატს</strong> უწოდებენ ამერიკულ ფეხბურთში.',
      'სწორედ ეს პერიოდია დღეს არქივებით ყველაზე რთული აღსადგენი — შემორჩა მნიშვნელოვნად ნაკლები ცხრილი, შემადგენლობა და შედეგი, ვიდრე მოგვიანო სეზონებზე. ამიტომ მას უფრო სწორია გარდამავალ ეტაპად აღვიქვათ: ფედერაცია უკვე არსებობდა, გუნდები ყალიბდებოდა, ტარდებოდა ეროვნული შეჯიბრებები.',
      'ამ დროს დაიწყეს გამოჩენა კლუბებმა, რომლებიც მოგვიანებით ქართული ლიგის ისტორიის მნიშვნელოვანი ნაწილი გახდნენ. ერთ-ერთი ყველაზე ცნობილი იყო <strong>Tbilisi Crusaders</strong>, დაარსებული 2013 წელს. მოგვიანებით გაჩნდნენ <strong>Rustavi Steelers</strong>, <strong>AFC Tbilisi</strong>, <strong>Kutaisi Lions</strong> და <strong>Tbilisi Eagles</strong>.',
      'ამერიკული ფეხბურთი თანდათან სცდებოდა დედაქალაქის საზღვრებს. გუნდები და პროექტები ჩნდებოდა თბილისში, ქუთაისში, რუსთავში, მცხეთაში, ზუგდიდსა და სხვა ადგილებში. სპორტი აღარ იყო მხოლოდ თბილისური მოვლენა.',
    ],
  },
  s2017: {
    h2: '2017 — ჩემპიონატის <span class="grad-gold">თანამედროვე ეპოქის</span> დასაწყისი',
    p1: '2017 წელი ერთ-ერთი მთავარი გარდამტეხი მომენტი გახდა. სწორედ ამ წლიდან იწყება <strong>Georgian American Football League</strong>-ის თანამედროვე ისტორია, რომლისთვისაც მნიშვნელოვნად მეტი სტატისტიკა და შედეგია შემორჩენილი.',
    p2: 'პირველი სეზონი 2017 წლის ივნისიდან ოქტომბრამდე მიმდინარეობდა. ჩემპიონატში მონაწილეობდნენ <strong>Tbilisi Crusaders, Rustavi Steelers, Kutaisi Lions და Mtskheta Iberia</strong>. საუკეთესო გუნდები პლეი-ოფში გადიოდნენ. ფინალი 2017 წლის 1 ოქტომბერს რუსთავში გაიმართა.',
    pWin: 'გაიმარჯვა <strong>Tbilisi Crusaders</strong>-მა და თანამედროვე Georgian American Football League-ის პირველი ჩემპიონი გახდა. გაჩნდა რეგულარული ეროვნული ლიგა, საკლუბო სისტემა და ოფიციალური ჩემპიონი.',
  },
  s2018: {
    h2: '2018 — <span class="grad-gold">Rustavi Steelers</span>-ის პირველი ჩემპიონობა',
    p1: 'ფინალში კვლავ შეხვდნენ ერთმანეთს <strong>Tbilisi Crusaders</strong> და <strong>Rustavi Steelers</strong>. ამჯერად Steelers-მა გაიმარჯვა.',
    p2: 'Steelers-მა სეზონი მარცხის გარეშე დაასრულა და პირველად გახდა საქართველოს ჩემპიონი. ფინალი დრამატული გამოდგა: Crusaders მეოთხე მეოთხედში 18:12 უსწრებდა, თუმცა Steelers-მა ზედიზედ ორი პანტი დაბლოკა და გადამწყვეტი ქულები მოაგროვა. ასე გაჩნდა პირველი ნამდვილი საკლუბო დაპირისპირება — <strong>Crusaders Steelers-ის წინააღმდეგ</strong>.',
  },
  s2019: {
    h2: '2019 — ჩემპიონატის <span class="grad-gold">გაფართოება</span>',
    intro: 'თუ 2018 წელს ჩემპიონატში ოთხი გუნდი მონაწილეობდა, 2019 წელს მათი რიცხვი ექვსამდე გაიზარდა, ფედერაცია კი რვამდე გაზრდას გეგმავდა. წარმოდგენილი იყო გუნდები ქვეყნის სხვადასხვა კუთხიდან:',
    teams: ['Tbilisi Crusaders', 'Rustavi Steelers', 'AFC Tbilisi', 'Tbilisi Eagles', 'Sokhumi Warriors', 'Western Bad Boys (ზუგდიდი)'],
    sokhumiH3: 'Sokhumi Warriors',
    sokhumiP: 'განსაკუთრებული ადგილი უჭირავს გუნდ <strong>Sokhumi Warriors</strong>-ს. 2019 წელს ფედერაციამ მოაწყო სამეგობრო მატჩი Sokhumi Warriors-სა და Tbilisi-ის გუნდს შორის, მიძღვნილი ჟიული შარტავას 75 წლისთავისადმი. მოგვიანებით Warriors ნახევარფინალამდე მივიდა, სადაც Crusaders შეხვდა.',
    sokhumiNote: 'სოხუმელი გუნდის არსებობის ფაქტი მნიშვნელოვანი იყო არა მხოლოდ სპორტული კუთხით. ამერიკული ფეხბურთი ხდებოდა სივრცე, რომლის მეშვეობითაც საქართველოს სხვადასხვა კუთხის ხალხი საერთო სპორტული გარემოს ნაწილად რჩებოდა.',
    westernH3: 'Western Bad Boys',
    westernP: 'ჩემპიონატში ასევე მონაწილეობდა გუნდი <strong>Western Bad Boys ზუგდიდიდან</strong>. მართალია, მისი შედეგები მოკრძალებული იყო, მონაწილეობა კიდევ ერთი დადასტურება გახდა იმისა, რომ ფედერაცია სპორტს ავითარებდა არა მხოლოდ თბილისსა და რუსთავში, არამედ რეგიონებშიც.',
    steelersH3: 'Steelers კვლავ ჩემპიონია',
    steelersIntro: '2019 წლის ფინალმა კვლავ შეახვედრა ბოლო წლების მთავარი მეტოქეები.',
    champsLabel: 'პირველი სამი თანამედროვე სეზონი ასე დასრულდა:',
  },
  s2020: {
    h2: '2020 — <span class="grad-gold">პანდემია და Steelers-ის მეოთხე ჩემპიონობა</span>',
    p1: '2020 წლის სეზონი COVID-19-ის პანდემიის პირობებში მიმდინარეობდა და მხოლოდ ოქტომბერში დაიწყო. მონაწილეობდა ოთხი გუნდი: Rustavi Steelers, Tbilisi Crusaders, Tbilisi Eagles და AFC Tbilisi (უკანასკნელი მოგვიანებით გამოეთიშა). რთული პირობების მიუხედავად, სეზონი დასრულდა. რეგულარულ ჩემპიონატში Steelers-მა 5–1 აჩვენა და დამაჯერებლად დაიკავა პირველი ადგილი.',
    p2: 'Steelers-მა მეოთხე ჩემპიონის ტიტული მოიპოვა და 2020 წლის ბოლოსთვის ადრეული თანამედროვე ეპოქის დომინანტი გუნდი იყო.',
  },
  s2021: {
    h2: '2021 — საკლუბო ფეხბურთის <span class="grad-gold">გარდატეხა და კრიზისი</span>',
    p1: '2021 წლის ჩემპიონატი 5 ივნისს დაიწყო. მაგრამ შემდეგ მოხდა ის, რისი წარმოდგენაც ადრე თითქმის შეუძლებელი იყო: 24 ივლისს ტურნირს გამოეთიშა <strong>Tbilisi Crusaders</strong>, 26 ივლისს კი — <strong>Rustavi Steelers</strong>. ორი გუნდი, რომლებიც ქართული ამერიკული ფეხბურთის პირველი ოთხი სეზონის სახეს განსაზღვრავდა, ერთდროულად გამოვიდა ჩემპიონატიდან. ეს სერიოზული დარტყმა იყო საკლუბო სისტემაზე.',
    p2: '2017–2019 პერიოდი მუდმივი ზრდის განცდას ქმნიდა: 4 გუნდი → 6 გუნდი → 8-ის გეგმები. მაგრამ პანდემიამ და მომდევნო პრობლემებმა აჩვენა, რამდენად რთულია სრულფასოვანი tackle football-ის შენარჩუნება მცირე სპორტულ ეკოსისტემაში — ის მოითხოვს აღჭურვილობას, ჩაფხუტებს, დაცვას, ბევრ მოთამაშეს, მწვრთნელს, მსაჯსა და ინფრასტრუქტურას.',
  },
  flag: {
    h2: 'შემობრუნება <span class="grad-gold">flag football</span>-ისკენ',
    p1: 'ერთ-ერთი უმნიშვნელოვანესი მიმართულება გახდა <strong>flag football</strong> — ამერიკული ფეხბურთის უკონტაქტო სახეობა. აქ არ არის საჭირო მძიმე დამცავი აღჭურვილობა, თავად სპორტის ორგანიზებაც გაცილებით მარტივია. ქვეყნისთვის, სადაც ამერიკული ფეხბურთი ჯერ კიდევ ვითარდება, ამან მისცა საშუალება უფრო სწრაფად შექმნილიყო გუნდები, ჩატარებულიყო შეჯიბრებები და მოზიდულიყო ახალი მოთამაშეები. თანდათან სწორედ flag football გახდა საქართველოს საერთაშორისო ასპარეზზე გასვლის ერთ-ერთი მთავარი ინსტრუმენტი.',
    p2: 'ამ შემობრუნებაში საკვანძო როლი ითამაშა <strong>დავით ფალავანდიშვილმა</strong>. ფედერაციის სათავეში სპორტისთვის რთულ პერიოდში ჩადგომით, მან ფაქტობრივად ფეხზე წამოაყენა ქართული ამერიკული ფეხბურთი: გუნდებს მოტივაცია და სტიმული მისცა წინ წასვლისთვის, მთელი საქმიანობა flag football-ის გარშემო ააწყო და შემდგომი განვითარების ვექტორი განსაზღვრა. სწორედ მისი ძალისხმევით დაიწყო ფედერაციამ სისტემური ზრდა — გაჩნდა ახალი შეჯიბრებები, პარტნიორები და სპონსორები, სპორტმა კი საერთაშორისო დონეზე გასვლის შანსი მიიღო.',
  },
  s2024: {
    h2: '2024 — <span class="grad-gold">პირველი მსოფლიო ჩემპიონატი</span>',
    p1: '2024 წელს ისტორიული ნაბიჯი გადაიდგა: საქართველოს ნაკრები პირველად მიიღო მონაწილეობა <strong>flag football-ის მსოფლიო ჩემპიონატში</strong>. ტურნირი ფინეთში, 2024 წლის აგვისტოში გაიმართა. ამ მსოფლიო დონეზე გასვლის მამოძრავებელი ძალა იყო <strong>დავით ფალავანდიშვილი</strong> — სწორედ მისი ხელმძღვანელობით მივიდა ფედერაცია მსოფლიო ჩემპიონატამდე. გვერდით იყო <strong>ამირან ქირიაც</strong>, ადამიანი, რომელიც ფედერაციის სათავეებთან ჯერ კიდევ 2011 წელს იდგა: ათ წელზე მეტის შემდეგ ის დავითს ეხმარებოდა და საქართველოს მსოფლიო დონეზე წარმოადგენდა. ეს სიმბოლო გახდა იმისა, თუ რამდენად შორს წავიდა სპორტი პირველი ორი გუნდის შემდეგ.',
  },
  bsb2025: {
    h2: '2025 — <span class="grad-gold">Black Sea</span> <span class="bsb-red">Bowl</span><img src="/black-sea-bowl-logo.webp" alt="" class="h2-logo">',
    p1: 'საქართველომ დაიწყო არა მხოლოდ საერთაშორისო ტურნირებზე მგზავრობა, არამედ <strong>უცხოური გუნდების მასპინძლობაც</strong>. თბილისში გაიმართა პირველი საერთაშორისო ტურნირი <strong>Black Sea Bowl</strong> — მისი იდეა და ორგანიზება, ყველა მონაწილე ქვეყნის მოწვევის ჩათვლით, მთლიანად იკისრა <strong>დავით ფალავანდიშვილმა</strong>. მონაწილეობდა რამდენიმე ქვეყნის გუნდი, ქართული ნაკრები კი ფინალამდე მივიდა.',
    p2: 'საქართველომ ტურნირში გაიმარჯვა. თბილისი საერთაშორისო შეჯიბრებების მოედნად ქცევას იწყებდა.',
  },
  bsb2026: {
    h2: '2026 — <span class="grad-gold">Black Sea</span> <span class="bsb-red">Bowl</span> <span class="grad-gold">ახალ დონეზე</span>',
    p1: '2026 წლის აგვისტოში თბილისში უკვე მეორე Black Sea Bowl გაიმართა. ტურნირი Olympic Park-ში მიმდინარეობდა და რვა ქვეყნის გუნდი შეკრიბა:',
    countries: ['საქართველო', 'უკრაინა', 'სომხეთი', 'ბულგარეთი', 'პოლონეთი', 'ყაზახეთი', 'კამერუნი', 'აშშ'],
    p2: 'რამდენიმე დღეში დაგეგმილი იყო დაახლოებით ოცი მატჩი — სრულიად სხვა მასშტაბი პირველ წლებთან შედარებით, როცა ქვეყანაში სულ რამდენიმე ენთუზიასტი და ორი გუნდი იყო.',
  },
  tackle: {
    h2: '2026 — ისტორიული გასვლა საერთაშორისო tackle football-ში',
    p1: 'თანამედროვე ისტორიის მთავარი მოვლენა სხვა ნაბიჯი გახდა. 2026 წლის სექტემბერში IFAF-მა გამოაცხადა ევროპული ჩემპიონატის შემადგენლობა. და ისტორიაში პირველად <strong>საქართველო შევიდა IFAF-ის ოფიციალურ ევროპულ tackle football ციკლში</strong> — საუბარია უკვე არა flag football-ზე, არამედ სრულფასოვან საკონტაქტო ამერიკულ ფეხბურთზე.',
    p2: 'საქართველო განაცხადშია <strong>European Championship Level 2</strong>-ში ერთად:',
    lvl2: ['ესპანეთი', 'Great Britain Development Team'],
    p3: 'ეს არის საქართველოს ოფიციალური საერთაშორისო დებიუტი ევროპულ tackle football ციკლში.',
  },
  fixtures: {
    date1: '2026 წლის 11 ოქტომბერი', place1: 'თბილისი', teams1: 'Georgia vs Great Britain Development Team',
    date2: '2026 წლის 24 ოქტომბერი', place2: 'ესპანეთი', teams2: 'Spain vs Georgia',
  },
  finale: {
    h2: '<span class="grad-gold">ორი გუნდიდან</span> <span class="grad-gold">ეროვნულ ნაკრებამდე</span>',
    p1: '2010 წელს ამერიკული ფეხბურთი თბილისში ძირითადად პატარა ინიციატივად არსებობდა, რომელიც ამერიკელ სამხედროებსა და ცალკეულ ენთუზიასტებს უკავშირდებოდა. 2011 წელს გაჩნდა ფედერაცია — და სულ ორი გუნდი. მოთამაშეებსა და მწვრთნელებს საზღვარგარეთ უწევდათ სწავლა.',
    intro: 'შემდეგ გაჩნდა პირველი ქართული კლუბები:',
    p2: '2017 წელს გაჩნდა თანამედროვე ეროვნული ლიგა — პირველი ჩემპიონები გახდნენ Crusaders, შემდეგ დაიწყო Rustavi Steelers-ის ეპოქა ზედიზედ სამი ტიტულით. 2019 წელს ჩემპიონატი სხვადასხვა რეგიონის გუნდებს აერთიანებდა. შემდეგ მოვიდა პანდემია და 2021 წელი გარდამტეხი გახდა. მაგრამ სპორტი არ გამქრალა — მან მიმართულება შეიცვალა.',
    p3: 'flag football-მა მისცა საშუალება მოეზიდა ახალი მოთამაშეები და საქართველო შიდა ჩემპიონატის ფარგლებს გაეყვანა. 2024 წელს — პირველი მსოფლიო ჩემპიონატი, 2025 წელს — პირველი Black Sea Bowl და მასში გამარჯვება, 2026 წელს — საერთაშორისო ტურნირი რვა ქვეყნით და, ბოლოს, დებიუტი ევროპულ tackle football-ში.',
    p4: 'ორი გუნდიდან და რამდენიმე ენთუზიასტიდან ეროვნულ ნაკრებამდე, საერთაშორისო ტურნირებამდე და ევროპულ ჩემპიონატამდე დაახლოებით თხუთმეტი წელი გავიდა. თანამედროვე აღმავლობაში გადამწყვეტი როლი ითამაშა <strong>დავით ფალავანდიშვილმა</strong>: სწორედ მან წამოაყენა ფედერაცია, გუნდებს მოტივაცია მისცა და სპორტის გარშემო შემოკრიბა პარტნიორები და სპონსორები, რომელთა წყალობითაც შესაძლებელი გახდა ჩემპიონატებიც და საერთაშორისო ასპარეზზე გასვლაც. ამ ისტორიის ყველაზე სიმბოლური კი — <strong>ამირან ქირიას</strong> სახელია: ადამიანი, რომელიც ფედერაციის სათავეებთან 2011 წელს იდგა, წლების შემდეგ თანამედროვე ნაკრებსაც დაუკავშირდა.',
    path: 'თბილისში პირველი თამაშებიდან → ფედერაციის დაარსებამდე → პირველ კლუბებამდე → ეროვნულ ჩემპიონატამდე → Crusaders-სა და Steelers-ის ეპოქამდე → პანდემიის შემდგომ კრიზისამდე → flag football-ის განვითარებამდე → მსოფლიო ჩემპიონატამდე → თბილისში საერთაშორისო ტურნირებამდე → და, ბოლოს, საქართველოს დებიუტამდე ევროპულ tackle football-ში 2026 წელს.',
  },
}

const ru: AboutContent = {
  heroTitle: 'История американского футбола в Грузии',
  heroLead: 'Американский футбол в Грузии — это история не одного клуба и не одного поколения игроков. Это история, которая началась с небольшого сообщества энтузиастов, постепенно превратилась в национальную спортивную систему, пережила годы роста, пандемию и кризис клубного футбола, а затем вышла на международную арену.',
  heroP2: 'Сегодня грузинская сборная участвует в международных соревнованиях, в Тбилиси приезжают команды из разных стран, а Грузия впервые в своей истории вошла в официальный европейский цикл IFAF по tackle football. Но путь к этому занял более пятнадцати лет.',
  s2010: {
    h2: '<span class="grad-gold">Первые шаги</span>: до создания федерации',
    p: [
      'Одни из первых документально подтверждённых свидетельств существования американского футбола в Грузии относятся ещё к 2010 году.',
      '4 декабря 2010 года в Тбилиси на искусственном поле Tavartkiladze Educational Institution состоялся товарищеский матч по американскому футболу между преподавателями английского языка и американскими морскими пехотинцами.',
      'Это был ещё не национальный чемпионат и не полноценная грузинская лига, однако этот матч показывает, что интерес к американскому футболу в Грузии существовал ещё до создания национальной федерации.',
      'Американские военнослужащие впоследствии продолжали участвовать в мероприятиях, связанных с развитием этого вида спорта. В июне 2014 года на стадионе Merani в Тбилиси, например, состоялся матч по flag football между американскими морскими пехотинцами и грузинской командой.',
      'Именно в этот период постепенно формировалась среда, из которой позже появилась организованная грузинская система американского футбола.',
    ],
  },
  s2011: {
    h2: '2011 — <span class="grad-gold">создание Федерации</span> американского футбола Грузии',
    p: [
      'Настоящей отправной точкой истории грузинского американского футбола можно считать 2011 год.',
      'В этом году была создана <strong>American Football Federation of Georgia</strong>. Международная федерация IFAF указывает 2011 год как год основания грузинской федерации.',
      'На раннем этапе движение было совсем небольшим. По сохранившимся материалам, в начале существовали всего две команды — <strong>Crusaders</strong> и <strong>Grizzlies</strong>. Игроки и тренеры должны были получать знания и опыт за пределами страны — в Европе и США.',
      'Одной из центральных фигур этого периода был <strong>Амиран Кирия</strong>. До возвращения в Грузию Кирия несколько лет играл в американский футбол в России. Вернувшись на родину, он занялся развитием нового для Грузии вида спорта и стал одним из главных людей у истоков федерации.',
      'Перед молодой федерацией стояла огромная задача: фактически создать инфраструктуру американского футбола практически с нуля — найти игроков, подготовить тренеров и судей, сформировать команды и организовать соревнования. Так началась первая организованная глава грузинского американского футбола.',
    ],
  },
  s2012: {
    h2: '2012–2016 — <span class="grad-gold">первые соревнования и появление клубов</span>',
    p: [
      'В первые годы после создания федерации американский футбол постепенно выходил за рамки небольшой группы энтузиастов. Уже в 2012 году грузинские источники называют проходившие соревнования <strong>первым чемпионатом Грузии</strong> по американскому футболу.',
      'Именно этот период сегодня труднее всего восстановить по архивам — сохранилось значительно меньше таблиц, составов и результатов, чем по более поздним сезонам. Поэтому его правильнее воспринимать как переходный этап: федерация уже существовала, команды формировались, проводились национальные соревнования.',
      'В это время начали появляться клубы, которые позднее станут важной частью истории грузинской лиги. Одним из наиболее известных стал <strong>Tbilisi Crusaders</strong>, основанный в 2013 году. Позже появились <strong>Rustavi Steelers</strong>, <strong>AFC Tbilisi</strong>, <strong>Kutaisi Lions</strong> и <strong>Tbilisi Eagles</strong>.',
      'Американский футбол постепенно начал выходить за пределы столицы. Команды и проекты появлялись в Тбилиси, Кутаиси, Рустави, Мцхете, Зугдиди и других местах. Спорт переставал быть исключительно тбилисским явлением.',
    ],
  },
  s2017: {
    h2: '2017 — начало <span class="grad-gold">современной эры</span> чемпионата',
    p1: '2017 год стал одним из главных переломных моментов. Именно с этого года начинается современная история <strong>Georgian American Football League</strong>, для которой сохранилось значительно больше статистики и результатов.',
    p2: 'Первый сезон проходил с июня по октябрь 2017 года. В чемпионате участвовали <strong>Tbilisi Crusaders, Rustavi Steelers, Kutaisi Lions и Mtskheta Iberia</strong>. Лучшие команды выходили в плей-офф. Финал состоялся 1 октября 2017 года в Рустави.',
    pWin: 'Победу одержали <strong>Tbilisi Crusaders</strong>, став первыми чемпионами современной Georgian American Football League. Появилась регулярная национальная лига, клубная система и официальный чемпион.',
  },
  s2018: {
    h2: '2018 — первое чемпионство <span class="grad-gold">Rustavi Steelers</span>',
    p1: 'В финале снова встретились <strong>Tbilisi Crusaders</strong> и <strong>Rustavi Steelers</strong>. На этот раз победили Steelers.',
    p2: 'Steelers завершили сезон без поражений и впервые стали чемпионами Грузии. Финал получился драматичным: Crusaders вели 18:12 в четвёртой четверти, однако Steelers заблокировали два панта подряд и набрали решающие очки. Так появилось первое настоящее клубное соперничество — <strong>Crusaders против Steelers</strong>.',
  },
  s2019: {
    h2: '2019 — <span class="grad-gold">расширение</span> чемпионата',
    intro: 'Если в 2018 году в чемпионате участвовали четыре команды, то в 2019 году их стало шесть, а федерация рассчитывала довести число до восьми. Были представлены команды из разных частей страны:',
    teams: ['Tbilisi Crusaders', 'Rustavi Steelers', 'AFC Tbilisi', 'Tbilisi Eagles', 'Sokhumi Warriors', 'Western Bad Boys (Зугдиди)'],
    sokhumiH3: 'Sokhumi Warriors',
    sokhumiP: 'Особое место занимает команда <strong>Sokhumi Warriors</strong>. В 2019 году федерация организовала товарищеский матч между Sokhumi Warriors и командой Tbilisi, посвящённый 75-летию Жиули Шартавы. Позднее Warriors дошли до полуфинала, где встретились с Crusaders.',
    sokhumiNote: 'Сам факт существования команды из Сухуми был важен не только со спортивной точки зрения. Американский футбол становился площадкой, через которую люди из разных частей Грузии оставались частью общей спортивной среды.',
    westernH3: 'Western Bad Boys',
    westernP: 'В чемпионате также участвовала команда <strong>Western Bad Boys из Зугдиди</strong>. Хотя её результаты были скромными, участие стало ещё одним свидетельством того, что федерация развивала спорт не только в Тбилиси и Рустави, но и в регионах.',
    steelersH3: 'Steelers снова чемпионы',
    steelersIntro: 'Финал 2019 года вновь свёл главных соперников последних лет.',
    champsLabel: 'Первые три современных сезона завершились так:',
  },
  s2020: {
    h2: '2020 — <span class="grad-gold">пандемия и четвёртое чемпионство Steelers</span>',
    p1: 'Сезон 2020 года проходил в условиях пандемии COVID-19 и стартовал только в октябре. Участвовали четыре команды: Rustavi Steelers, Tbilisi Crusaders, Tbilisi Eagles и AFC Tbilisi (последний впоследствии снялся). Несмотря на сложные условия, сезон был завершён. В регулярном чемпионате Steelers показали 5–1 и уверенно заняли первое место.',
    p2: 'Steelers завоевали четвёртый чемпионский титул и к концу 2020 года были доминирующей командой ранней современной эпохи.',
  },
  s2021: {
    h2: '2021 — <span class="grad-gold">перелом и кризис</span> клубного футбола',
    p1: 'Чемпионат 2021 года начался 5 июня. Но затем произошло то, чего раньше почти невозможно было представить: 24 июля с турнира снялись <strong>Tbilisi Crusaders</strong>, а 26 июля — <strong>Rustavi Steelers</strong>. Две команды, определявшие лицо грузинского американского футбола первых четырёх сезонов, одновременно вышли из чемпионата. Это стало серьёзным ударом по клубной системе.',
    p2: 'Период 2017–2019 создавал ощущение постоянного роста: 4 команды → 6 команд → планы на 8. Но пандемия и последующие проблемы показали, насколько трудно поддерживать полноценный tackle football в небольшой спортивной экосистеме — он требует экипировки, шлемов, защиты, большого количества игроков, тренеров, судей и инфраструктуры.',
  },
  flag: {
    h2: 'Поворот к <span class="grad-gold">flag football</span>',
    p1: 'Одним из важнейших направлений стал <strong>flag football</strong> — бесконтактная разновидность американского футбола. Здесь не требуется тяжёлая защитная экипировка, а сам спорт значительно проще организовать. Для страны, где американский футбол ещё развивается, это дало возможность быстрее создавать команды, проводить соревнования и привлекать новых игроков. Постепенно именно flag football стал одним из главных инструментов выхода Грузии на международную арену.',
    p2: 'Ключевую роль в этом повороте сыграл <strong>Давид Палавандишвили</strong>. Возглавив федерацию в непростой для спорта период, он фактически поднял грузинский американский футбол с колен: дал командам мотивацию и стимул двигаться дальше, выстроил всю работу вокруг flag football и задал вектор дальнейшего развития. Именно его усилиями федерация начала системно расти — появились новые соревнования, партнёры и спонсоры, а спорт получил шанс выйти на международный уровень.',
  },
  s2024: {
    h2: '2024 — <span class="grad-gold">первый чемпионат мира</span>',
    p1: 'В 2024 году произошёл исторический шаг: сборная Грузии впервые приняла участие в <strong>чемпионате мира по flag football</strong>. Турнир проходил в Финляндии в августе 2024 года. Движущей силой этого выхода на мировой уровень стал <strong>Давид Палавандишвили</strong> — именно под его руководством федерация дошла до чемпионата мира. Рядом был и <strong>Амиран Кирия</strong>, человек, который стоял у истоков федерации ещё в 2011 году: спустя более десяти лет он помогал Давиду и представлял Грузию на мировом уровне. Это стало символом того, насколько далеко продвинулся спорт с момента первых двух команд.',
  },
  bsb2025: {
    h2: '2025 — <span class="grad-gold">Black Sea</span> <span class="bsb-red">Bowl</span><img src="/black-sea-bowl-logo.webp" alt="" class="h2-logo">',
    p1: 'Грузия начала не только ездить на международные турниры, но и <strong>принимать иностранные команды у себя</strong>. В Тбилиси состоялся первый международный турнир <strong>Black Sea Bowl</strong> — его идею и организацию, вплоть до приглашения всех стран-участниц, целиком взял на себя <strong>Давид Палавандишвили</strong>. Участвовали команды из нескольких стран, а грузинская сборная дошла до финала.',
    p2: 'Грузия выиграла турнир. Тбилиси начал превращаться в площадку для международных соревнований.',
  },
  bsb2026: {
    h2: '2026 — <span class="grad-gold">Black Sea</span> <span class="bsb-red">Bowl</span> <span class="grad-gold">на новом уровне</span>',
    p1: 'В августе 2026 года в Тбилиси состоялся уже второй Black Sea Bowl. Турнир проходил в Olympic Park и собрал команды из восьми стран:',
    countries: ['Грузия', 'Украина', 'Армения', 'Болгария', 'Польша', 'Казахстан', 'Камерун', 'США'],
    p2: 'За несколько дней было запланировано около двадцати матчей — совершенно другой масштаб по сравнению с первыми годами, когда в стране было всего несколько энтузиастов и две команды.',
  },
  tackle: {
    h2: '2026 — исторический выход в международный tackle football',
    p1: 'Главным событием современной истории стал другой шаг. В сентябре 2026 года IFAF объявила состав европейского чемпионата. И впервые в истории <strong>Грузия вошла в официальный европейский цикл IFAF по tackle football</strong> — речь уже не о flag football, а о полноценном контактном американском футболе.',
    p2: 'Грузия заявлена в <strong>European Championship Level 2</strong> вместе с:',
    lvl2: ['Испанией', 'Great Britain Development Team'],
    p3: 'Это официальный международный дебют Грузии в европейском цикле tackle football.',
  },
  fixtures: {
    date1: '11 октября 2026', place1: 'Тбилиси', teams1: 'Georgia vs Great Britain Development Team',
    date2: '24 октября 2026', place2: 'Испания', teams2: 'Spain vs Georgia',
  },
  finale: {
    h2: 'От <span class="grad-gold">двух команд</span> до <span class="grad-gold">международной сборной</span>',
    p1: 'В 2010 году американский футбол в Тбилиси существовал преимущественно как небольшая инициатива, связанная с американскими военнослужащими и отдельными энтузиастами. В 2011 году появилась федерация — и всего две команды. Игрокам и тренерам приходилось учиться за границей.',
    intro: 'Затем появились первые грузинские клубы:',
    p2: 'В 2017 году появилась современная национальная лига — первыми чемпионами стали Crusaders, затем началась эпоха Rustavi Steelers с тремя титулами подряд. В 2019 чемпионат объединял команды из разных регионов. Потом пришла пандемия, и 2021 год стал переломным. Но спорт не исчез — он изменил направление.',
    p3: 'Flag football дал возможность привлечь новых игроков и вывести Грузию за пределы внутреннего чемпионата. В 2024 году — первый чемпионат мира, в 2025 — первый Black Sea Bowl и победа в нём, в 2026 — международный турнир с восемью странами и, наконец, дебют в европейском tackle football.',
    p4: 'От двух команд и нескольких энтузиастов до национальной сборной, международных турниров и европейского чемпионата прошло примерно пятнадцать лет. Решающую роль в современном подъёме сыграл <strong>Давид Палавандишвили</strong>: именно он поднял федерацию, дал командам мотивацию и собрал вокруг спорта партнёров и спонсоров, благодаря которым стали возможны и чемпионаты, и выход на международную арену. А самое символичное во всей этой истории — имя <strong>Амирана Кирии</strong>: человек, стоявший у истоков федерации в 2011 году, спустя годы оказался связан и с современной сборной.',
    path: 'От первых игр в Тбилиси → к созданию федерации → первым клубам → национальному чемпионату → эпохе Crusaders и Steelers → кризису после пандемии → развитию flag football → мировому чемпионату → международным турнирам в Тбилиси → и, наконец, дебюту Грузии в европейском tackle football в 2026 году.',
  },
}

const en: AboutContent = {
  heroTitle: 'The history of American football in Georgia',
  heroLead: 'American football in Georgia is not the story of a single club or a single generation of players. It began with a small community of enthusiasts, gradually grew into a national sporting system, lived through years of growth, the pandemic and a crisis of club football, and then reached the international stage.',
  heroP2: 'Today the Georgian national team competes in international tournaments, teams from different countries come to Tbilisi, and Georgia has for the first time in its history entered the official IFAF European tackle football cycle. But the road here took more than fifteen years.',
  s2010: {
    h2: '<span class="grad-gold">First steps</span>: before the federation',
    p: [
      'Some of the earliest documented evidence of American football in Georgia dates back to 2010.',
      'On 4 December 2010 in Tbilisi, on the artificial pitch of the Tavartkiladze Educational Institution, a friendly American football match was held between English-language teachers and United States Marines.',
      'This was not yet a national championship or a full Georgian league, but the match shows that interest in American football existed in Georgia even before the national federation was founded.',
      'US servicemen later continued to take part in events linked to the development of the sport. In June 2014, for example, a flag football match was held at the Merani stadium in Tbilisi between US Marines and a Georgian team.',
      'It was during this period that the environment gradually formed from which the organised Georgian American football system would later emerge.',
    ],
  },
  s2011: {
    h2: '2011 — the <span class="grad-gold">founding of the Federation</span> of American Football of Georgia',
    p: [
      '2011 can be considered the true starting point of the history of Georgian American football.',
      'That year the <strong>American Football Federation of Georgia</strong> was established. The international federation IFAF lists 2011 as the founding year of the Georgian federation.',
      'In the early stage the movement was very small. According to surviving records, there were only two teams at first — <strong>Crusaders</strong> and <strong>Grizzlies</strong>. Players and coaches had to gain knowledge and experience abroad — in Europe and the USA.',
      'One of the central figures of this period was <strong>Amiran Kiria</strong>. Before returning to Georgia, Kiria had played American football in Russia for several years. Back home, he took up the development of a sport new to Georgia and became one of the key people at the roots of the federation.',
      'The young federation faced an enormous task: to build the infrastructure of American football practically from scratch — to find players, train coaches and referees, form teams and organise competitions. So began the first organised chapter of Georgian American football.',
    ],
  },
  s2012: {
    h2: '2012–2016 — <span class="grad-gold">first competitions and the rise of clubs</span>',
    p: [
      'In the first years after the federation was founded, American football gradually moved beyond a small group of enthusiasts. As early as 2012, Georgian sources call the competitions held then the <strong>first championship of Georgia</strong> in American football.',
      'This is the period that is hardest to reconstruct from the archives today — far fewer tables, rosters and results have survived than for later seasons. It is better understood as a transitional stage: the federation already existed, teams were forming, and national competitions were being held.',
      'During this time clubs began to appear that would later become an important part of the history of the Georgian league. One of the best known was <strong>Tbilisi Crusaders</strong>, founded in 2013. Later came <strong>Rustavi Steelers</strong>, <strong>AFC Tbilisi</strong>, <strong>Kutaisi Lions</strong> and <strong>Tbilisi Eagles</strong>.',
      'American football gradually began to spread beyond the capital. Teams and projects appeared in Tbilisi, Kutaisi, Rustavi, Mtskheta, Zugdidi and other places. The sport ceased to be a purely Tbilisi phenomenon.',
    ],
  },
  s2017: {
    h2: '2017 — the start of the <span class="grad-gold">modern era</span> of the championship',
    p1: '2017 became one of the main turning points. It is from this year that the modern history of the <strong>Georgian American Football League</strong> begins, for which far more statistics and results have survived.',
    p2: 'The first season ran from June to October 2017. The championship featured <strong>Tbilisi Crusaders, Rustavi Steelers, Kutaisi Lions and Mtskheta Iberia</strong>. The best teams advanced to the play-offs. The final took place on 1 October 2017 in Rustavi.',
    pWin: '<strong>Tbilisi Crusaders</strong> won, becoming the first champions of the modern Georgian American Football League. A regular national league, a club system and an official champion had arrived.',
  },
  s2018: {
    h2: '2018 — the first championship of <span class="grad-gold">Rustavi Steelers</span>',
    p1: 'The final once again brought together <strong>Tbilisi Crusaders</strong> and <strong>Rustavi Steelers</strong>. This time the Steelers won.',
    p2: 'The Steelers finished the season undefeated and became champions of Georgia for the first time. The final was dramatic: the Crusaders led 18:12 in the fourth quarter, but the Steelers blocked two punts in a row and scored the decisive points. So the first real club rivalry was born — <strong>Crusaders versus Steelers</strong>.',
  },
  s2019: {
    h2: '2019 — the <span class="grad-gold">expansion</span> of the championship',
    intro: 'While four teams took part in the championship in 2018, in 2019 there were six, and the federation hoped to raise the number to eight. Teams from different parts of the country were represented:',
    teams: ['Tbilisi Crusaders', 'Rustavi Steelers', 'AFC Tbilisi', 'Tbilisi Eagles', 'Sokhumi Warriors', 'Western Bad Boys (Zugdidi)'],
    sokhumiH3: 'Sokhumi Warriors',
    sokhumiP: 'A special place belongs to <strong>Sokhumi Warriors</strong>. In 2019 the federation organised a friendly match between Sokhumi Warriors and a Tbilisi team, dedicated to the 75th anniversary of Zhiuli Shartava. Later the Warriors reached the semi-final, where they met the Crusaders.',
    sokhumiNote: 'The very existence of a team from Sukhumi mattered not only in sporting terms. American football was becoming a space through which people from different parts of Georgia remained part of a shared sporting environment.',
    westernH3: 'Western Bad Boys',
    westernP: 'The championship also featured <strong>Western Bad Boys from Zugdidi</strong>. Although their results were modest, their participation was further proof that the federation was developing the sport not only in Tbilisi and Rustavi, but also in the regions.',
    steelersH3: 'Steelers champions again',
    steelersIntro: 'The 2019 final once again brought together the main rivals of recent years.',
    champsLabel: 'The first three modern seasons ended like this:',
  },
  s2020: {
    h2: '2020 — <span class="grad-gold">the pandemic and the fourth Steelers title</span>',
    p1: 'The 2020 season took place under the COVID-19 pandemic and only started in October. Four teams took part: Rustavi Steelers, Tbilisi Crusaders, Tbilisi Eagles and AFC Tbilisi (the last later withdrew). Despite the difficult conditions, the season was completed. In the regular championship the Steelers went 5–1 and confidently took first place.',
    p2: 'The Steelers won their fourth championship title and by the end of 2020 were the dominant team of the early modern era.',
  },
  s2021: {
    h2: '2021 — the <span class="grad-gold">turning point and crisis</span> of club football',
    p1: 'The 2021 championship began on 5 June. But then something happened that had been almost impossible to imagine before: on 24 July <strong>Tbilisi Crusaders</strong> withdrew from the tournament, and on 26 July — <strong>Rustavi Steelers</strong>. Two teams that had defined the face of Georgian American football in its first four seasons left the championship at the same time. It was a serious blow to the club system.',
    p2: 'The 2017–2019 period created a sense of steady growth: 4 teams → 6 teams → plans for 8. But the pandemic and the problems that followed showed how hard it is to sustain full tackle football in a small sporting ecosystem — it requires gear, helmets, protection, a large number of players, coaches, referees and infrastructure.',
  },
  flag: {
    h2: 'The turn towards <span class="grad-gold">flag football</span>',
    p1: 'One of the most important directions became <strong>flag football</strong> — a non-contact variety of American football. It requires no heavy protective gear, and the sport itself is far easier to organise. For a country where American football is still developing, this made it possible to create teams faster, hold competitions and attract new players. Gradually flag football became one of the main tools for Georgia to reach the international stage.',
    p2: 'A key role in this turn was played by <strong>David Palavandishvili</strong>. Taking the helm of the federation in a difficult period for the sport, he effectively lifted Georgian American football back onto its feet: he gave the teams motivation and the drive to move forward, built all the work around flag football and set the direction for further development. It was through his efforts that the federation began to grow systematically — new competitions, partners and sponsors appeared, and the sport got its chance to reach the international level.',
  },
  s2024: {
    h2: '2024 — the <span class="grad-gold">first World Championship</span>',
    p1: 'In 2024 a historic step was taken: the Georgian national team took part for the first time in the <strong>flag football World Championship</strong>. The tournament was held in Finland in August 2024. The driving force behind reaching this world level was <strong>David Palavandishvili</strong> — it was under his leadership that the federation reached the World Championship. Alongside him was <strong>Amiran Kiria</strong>, the man who stood at the roots of the federation back in 2011: more than ten years later he was helping David and representing Georgia on the world stage. It became a symbol of how far the sport had come since the first two teams.',
  },
  bsb2025: {
    h2: '2025 — <span class="grad-gold">Black Sea</span> <span class="bsb-red">Bowl</span><img src="/black-sea-bowl-logo.webp" alt="" class="h2-logo">',
    p1: 'Georgia began not only to travel to international tournaments but also to <strong>host foreign teams at home</strong>. The first international tournament, the <strong>Black Sea Bowl</strong>, was held in Tbilisi — its idea and organisation, down to inviting all the participating countries, were taken on entirely by <strong>David Palavandishvili</strong>. Teams from several countries took part, and the Georgian national team reached the final.',
    p2: 'Georgia won the tournament. Tbilisi was beginning to turn into a venue for international competitions.',
  },
  bsb2026: {
    h2: '2026 — <span class="grad-gold">Black Sea</span> <span class="bsb-red">Bowl</span> <span class="grad-gold">at a new level</span>',
    p1: 'In August 2026 the second Black Sea Bowl was held in Tbilisi. The tournament took place in Olympic Park and gathered teams from eight countries:',
    countries: ['Georgia', 'Ukraine', 'Armenia', 'Bulgaria', 'Poland', 'Kazakhstan', 'Cameroon', 'USA'],
    p2: 'About twenty matches were scheduled over a few days — a completely different scale compared with the early years, when there were only a few enthusiasts and two teams in the country.',
  },
  tackle: {
    h2: '2026 — the historic entry into international tackle football',
    p1: 'The main event of modern history was a different step. In September 2026 IFAF announced the line-up of the European championship. And for the first time in history <strong>Georgia entered the official IFAF European tackle football cycle</strong> — this is no longer about flag football, but about full contact American football.',
    p2: 'Georgia is entered in <strong>European Championship Level 2</strong> together with:',
    lvl2: ['Spain', 'Great Britain Development Team'],
    p3: "This is Georgia's official international debut in the European tackle football cycle.",
  },
  fixtures: {
    date1: '11 October 2026', place1: 'Tbilisi', teams1: 'Georgia vs Great Britain Development Team',
    date2: '24 October 2026', place2: 'Spain', teams2: 'Spain vs Georgia',
  },
  finale: {
    h2: 'From <span class="grad-gold">two teams</span> to a <span class="grad-gold">national squad</span>',
    p1: 'In 2010 American football in Tbilisi existed mainly as a small initiative linked to US servicemen and a few enthusiasts. In 2011 the federation appeared — and just two teams. Players and coaches had to learn abroad.',
    intro: 'Then the first Georgian clubs appeared:',
    p2: 'In 2017 the modern national league appeared — the first champions were the Crusaders, then came the era of Rustavi Steelers with three titles in a row. In 2019 the championship brought together teams from different regions. Then the pandemic came, and 2021 became a turning point. But the sport did not disappear — it changed direction.',
    p3: 'Flag football made it possible to attract new players and take Georgia beyond the domestic championship. In 2024 — the first World Championship, in 2025 — the first Black Sea Bowl and victory in it, in 2026 — an international tournament with eight countries and, finally, a debut in European tackle football.',
    p4: 'From two teams and a few enthusiasts to a national squad, international tournaments and a European championship, about fifteen years have passed. A decisive role in the modern rise was played by <strong>David Palavandishvili</strong>: it was he who lifted the federation, gave the teams motivation and gathered partners and sponsors around the sport, thanks to whom both the championships and the move onto the international stage became possible. And the most symbolic thing in this whole story is the name of <strong>Amiran Kiria</strong>: the man who stood at the roots of the federation in 2011 turned out, years later, to be connected with the modern national team as well.',
    path: 'From the first games in Tbilisi → to the founding of the federation → to the first clubs → to a national championship → to the era of Crusaders and Steelers → to the crisis after the pandemic → to the growth of flag football → to the World Championship → to international tournaments in Tbilisi → and, finally, to Georgia\'s debut in European tackle football in 2026.',
  },
}

const content: Record<Locale, AboutContent> = { ka, ru, en }

export const useAboutContent = () => {
  const { locale } = useLocale()
  return computed(() => content[locale.value])
}
