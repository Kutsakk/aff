export type Locale = 'ka' | 'en'

export interface EventItem {
  title: string
  date: string
  description: string
  image: string
  coords: string // "lat,lng" — пустая строка если карты нет
}

export interface TeamItem {
  name: string
  city: string
  description: string
  color: string
  image: string
  href?: string
}

export interface Messages {
  nav: { home: string, about: string, events: string, teams: string }
  hero: { title: string, subtitle: string, aboutBtn: string, eventsBtn: string }
  home: {
    aboutTitle: string, aboutDesc: string
    eventsTitle: string, eventsDesc: string
    teamsTitle: string, teamsDesc: string
  }
  about: {
    title: string
    federationName: string
    p1: string
    p2: string
    missionTitle: string, missionDesc: string
    visionTitle: string, visionDesc: string
  }
  events: { title: string, list: EventItem[] }
  teams: { title: string, list: TeamItem[], redirecting: string }
  footer: { copyright: string }
}

const sharedEventCoords = {
  olympicPark: '41.7239,44.7647',
  olympicVillage: '41.7196,44.7659',
  mukhiani: '41.7977,44.8018',
  rustavi: '41.5489,44.9931',
}

export const messages: Record<Locale, Messages> = {
  ka: {
    nav: {
      home: 'მთავარი',
      about: 'ჩვენს შესახებ',
      events: 'ღონისძიებები',
      teams: 'გუნდები',
    },
    hero: {
      title: 'საქართველოს ამერიკული ფეხბურთის ფედერაცია',
      subtitle: 'American Football Federation of Georgia',
      aboutBtn: 'ჩვენს შესახებ',
      eventsBtn: 'ღონისძიებები',
    },
    home: {
      aboutTitle: 'ჩვენს შესახებ',
      aboutDesc: 'გაიცანით საქართველოს ამერიკული ფეხბურთის ფედერაცია და ჩვენი მისია',
      eventsTitle: 'ღონისძიებები',
      eventsDesc: 'მომავალი თამაშები, ტურნირები და სპეციალური ღონისძიებები',
      teamsTitle: 'გუნდები',
      teamsDesc: 'საქართველოს ამერიკული ფეხბურთის გუნდები და მოთამაშეები',
    },
    about: {
      title: 'ჩვენს შესახებ',
      federationName: 'საქართველოს ამერიკული ფეხბურთის ფედერაცია',
      p1: 'GAFF (American Football Federation of Georgia) — საქართველოში ამერიკული ფეხბურთის განვითარებისა და პოპულარიზაციისთვის შექმნილი ფედერაცია. ჩვენი მიზანია სპორტის ამ სახეობის წინსვლა ქართულ საზოგადოებაში.',
      p2: 'ფედერაცია აერთიანებს გუნდებს მთელი საქართველოდან, ორგანიზებას უწევს ტურნირებსა და ღონისძიებებს, ასევე ხელს უწყობს ახალგაზრდა სპორტსმენების აღზრდას.',
      missionTitle: 'ჩვენი მისია',
      missionDesc: 'ამერიკული ფეხბურთის განვითარება საქართველოში, ახალგაზრდა თაობის ჩართვა და საერთაშორისო ასპარეზზე ქართული გუნდების წარმოჩენა.',
      visionTitle: 'ჩვენი ხედვა',
      visionDesc: 'საქართველო გახდეს ამერიკული ფეხბურთის რეგიონული ლიდერი და წარმატებით წარსდგეს საერთაშორისო შეჯიბრებებში.',
    },
    events: {
      title: 'ღონისძიებები',
      list: [
        { title: 'საქართველოს ეროვნული ჩემპიონატი (ფლეგ ფეხბურთი)', date: '5 ივლისი - შაბათი: 9:00-20:00 | 6 ივლისი - კვირა: 9:00-13:00', description: 'თბილისი, ბობ უოლშის ქ. (ოლიმპიური პარკი)', image: '/event8.jpg', coords: sharedEventCoords.olympicPark },
        { title: 'საქართველოს ეროვნული ლიგის ფინალური შეხვედრა: თბილისის ქრუსაიდერსი - რუსთავის სთილერსი', date: 'კვირა, 1 დეკემბერი', description: 'თბილისი, ბობ უოლშის ქ. (ოლიმპიური პარკი)', image: '/event1.jpg', coords: sharedEventCoords.olympicPark },
        { title: 'საქართველოს ეროვნული ლიგის ფინალი. სთილერსი - ქრუსაიდერსი', date: 'დასაწყისი 14:00', description: 'ოლიმპიური სოფელი თბილისი', image: '/event3.jpg', coords: sharedEventCoords.olympicVillage },
        { title: 'საქართველოს ეროვნული ლიგა. თბილისი - ტიტანები', date: 'დასაწყისი 14:00', description: 'თბილისი, მუხიანი, ნუშის ქ.43', image: '/event10.jpg', coords: sharedEventCoords.mukhiani },
        { title: 'საქართველოს ეროვნული ლიგა. იგლსი - ტიტანები', date: 'დასაწყისი 19:00', description: 'თბილისი, მუხიანი, ნუშის ქ.43', image: '/event6.jpg', coords: sharedEventCoords.mukhiani },
        { title: 'საქართველოს ეროვნული ლიგა. თბილისი - სთილერსი', date: 'დასაწყისი 14:00', description: 'თბილისი, მუხიანი, ნუშის ქ.43', image: '/event9.jpg', coords: sharedEventCoords.mukhiani },
        { title: 'საქართველოს ეროვნული ლიგა. მესამე კვირის მეორე შეხვედრა', date: 'დასაწყისი 19:00', description: 'თბილისი, მუხიანი, ნუშის ქ.43', image: '/event7.jpg', coords: sharedEventCoords.mukhiani },
        { title: 'საქართველოს ეროვნული ლიგა. მესამე კვირის პირველი შეხვედრა. იგლსი - სთილერსი', date: 'დასაწყისი 14:30', description: 'რუსთავი, ცენტრალური სტადიონი', image: '/event5.jpg', coords: sharedEventCoords.rustavi },
        { title: 'საქართველოს ეროვნული ლიგა. მეორე კვირის პირველი შეხვედრა. ქრუსაიდერსი - თბილისი', date: 'დასაწყისი 12:00', description: 'თბილისი, მუხიანი, ნუშის ქ.43', image: '/event2.jpg', coords: sharedEventCoords.mukhiani },
        { title: 'საქართველოს ეროვნული ლიგის გახსნა. პირველი კვირის პირველი შეხვედრა. იგლსი - ქრუსაიდერსი', date: 'დასაწყისი 14:00', description: 'თბილისი, მუხიანი, ნუშის ქ.43', image: '/event7.jpg', coords: sharedEventCoords.mukhiani },
        { title: 'ივენტი 11', date: '', description: '', image: '/events11.jpg', coords: '' },
        { title: 'ივენტი 12', date: '', description: '', image: '/events12.jpg', coords: '' },
        { title: 'ივენტი 13', date: '', description: '', image: '/event13.jpg', coords: '' },
        { title: 'ივენტი 14', date: '', description: '', image: '/event14.jpg', coords: '' },
        { title: 'ივენტი 15', date: '', description: '', image: '/event15.jpg', coords: '' },
        { title: 'ივენტი 16', date: '', description: '', image: '/event16.jpg', coords: '' },
      ],
    },
    teams: {
      title: 'გუნდები',
      redirecting: 'გადამისამართება...',
      list: [
        { name: 'ჯვაროსნები', city: 'თბილისი', description: 'საქართველოს პირველი ამერიკული ფეხბურთის გუნდი, დაარსებული 2020 წელს.', color: '#ff4a4a', image: '/crusaders.jpg' },
        { name: 'არწივები', city: 'თბილისი', description: 'საქართველოს პირველი ამერიკული ფეხბურთის გუნდი, დაარსებული 2020 წელს.', color: '#09a01b', image: '/eagles.jpg', href: '/eagles/index.html' },
        { name: 'ტიტანები', city: 'თბილისი', description: 'თბილისის წარმომადგენელი გუნდი, ცნობილი თავისი აგრესიული თამაშის სტილით.', color: '#4a9eff', image: '/titans.png' },
        { name: 'სტილერსი', city: 'რუსთავი', description: 'იმერეთის რეგიონის გუნდი, გამოირჩევა ძლიერი დაცვით და გუნდური სულისკვეთებით.', color: '#c9a84c', image: '/rustavi.jpg' },
      ],
    },
    footer: {
      copyright: 'საქართველოს ამერიკული ფეხბურთის ფედერაცია. ყველა უფლება დაცულია.',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      events: 'Events',
      teams: 'Teams',
    },
    hero: {
      title: 'American Football Federation of Georgia',
      subtitle: 'საქართველოს ამერიკული ფეხბურთის ფედერაცია',
      aboutBtn: 'About Us',
      eventsBtn: 'Events',
    },
    home: {
      aboutTitle: 'About Us',
      aboutDesc: 'Get to know the American Football Federation of Georgia and our mission',
      eventsTitle: 'Events',
      eventsDesc: 'Upcoming games, tournaments and special events',
      teamsTitle: 'Teams',
      teamsDesc: 'Georgian American football teams and players',
    },
    about: {
      title: 'About Us',
      federationName: 'American Football Federation of Georgia',
      p1: 'GAFF (American Football Federation of Georgia) is the federation created for the development and promotion of American football in Georgia. Our goal is to advance this sport within Georgian society.',
      p2: 'The federation unites teams from all over Georgia, organizes tournaments and events, and supports the development of young athletes.',
      missionTitle: 'Our Mission',
      missionDesc: 'To develop American football in Georgia, engage the younger generation, and represent Georgian teams on the international stage.',
      visionTitle: 'Our Vision',
      visionDesc: 'For Georgia to become a regional leader in American football and to compete successfully in international tournaments.',
    },
    events: {
      title: 'Events',
      list: [
        { title: 'Georgian National Championship (Flag Football)', date: 'July 5, Saturday: 9:00-20:00 | July 6, Sunday: 9:00-13:00', description: 'Tbilisi, Bob Walsh St. (Olympic Park)', image: '/event8.jpg', coords: sharedEventCoords.olympicPark },
        { title: 'Georgian National League Final: Tbilisi Crusaders vs Rustavi Steelers', date: 'Sunday, December 1', description: 'Tbilisi, Bob Walsh St. (Olympic Park)', image: '/event1.jpg', coords: sharedEventCoords.olympicPark },
        { title: 'Georgian National League Final. Steelers vs Crusaders', date: 'Kickoff 14:00', description: 'Olympic Village, Tbilisi', image: '/event3.jpg', coords: sharedEventCoords.olympicVillage },
        { title: 'Georgian National League. Tbilisi vs Titans', date: 'Kickoff 14:00', description: 'Tbilisi, Mukhiani, Nushi St. 43', image: '/event10.jpg', coords: sharedEventCoords.mukhiani },
        { title: 'Georgian National League. Eagles vs Titans', date: 'Kickoff 19:00', description: 'Tbilisi, Mukhiani, Nushi St. 43', image: '/event6.jpg', coords: sharedEventCoords.mukhiani },
        { title: 'Georgian National League. Tbilisi vs Steelers', date: 'Kickoff 14:00', description: 'Tbilisi, Mukhiani, Nushi St. 43', image: '/event9.jpg', coords: sharedEventCoords.mukhiani },
        { title: 'Georgian National League. Week 3, second match', date: 'Kickoff 19:00', description: 'Tbilisi, Mukhiani, Nushi St. 43', image: '/event7.jpg', coords: sharedEventCoords.mukhiani },
        { title: 'Georgian National League. Week 3, first match. Eagles vs Steelers', date: 'Kickoff 14:30', description: 'Rustavi, Central Stadium', image: '/event5.jpg', coords: sharedEventCoords.rustavi },
        { title: 'Georgian National League. Week 2, first match. Crusaders vs Tbilisi', date: 'Kickoff 12:00', description: 'Tbilisi, Mukhiani, Nushi St. 43', image: '/event2.jpg', coords: sharedEventCoords.mukhiani },
        { title: 'Georgian National League opening. Week 1, first match. Eagles vs Crusaders', date: 'Kickoff 14:00', description: 'Tbilisi, Mukhiani, Nushi St. 43', image: '/event7.jpg', coords: sharedEventCoords.mukhiani },
        { title: 'Event 11', date: '', description: '', image: '/events11.jpg', coords: '' },
        { title: 'Event 12', date: '', description: '', image: '/events12.jpg', coords: '' },
        { title: 'Event 13', date: '', description: '', image: '/event13.jpg', coords: '' },
        { title: 'Event 14', date: '', description: '', image: '/event14.jpg', coords: '' },
        { title: 'Event 15', date: '', description: '', image: '/event15.jpg', coords: '' },
        { title: 'Event 16', date: '', description: '', image: '/event16.jpg', coords: '' },
      ],
    },
    teams: {
      title: 'Teams',
      redirecting: 'Redirecting to Eagles...',
      list: [
        { name: 'Crusaders', city: 'Tbilisi', description: 'One of the first American football teams in Georgia, founded in 2020.', color: '#ff4a4a', image: '/crusaders.jpg' },
        { name: 'Eagles', city: 'Tbilisi', description: 'One of the first American football teams in Georgia, founded in 2020.', color: '#09a01b', image: '/eagles.jpg', href: '/eagles/index.html' },
        { name: 'Titans', city: 'Tbilisi', description: 'A Tbilisi team known for its aggressive playing style.', color: '#4a9eff', image: '/titans.png' },
        { name: 'Steelers', city: 'Rustavi', description: 'A team from the Imereti region, known for strong defense and team spirit.', color: '#c9a84c', image: '/rustavi.jpg' },
      ],
    },
    footer: {
      copyright: 'American Football Federation of Georgia. All rights reserved.',
    },
  },
}
