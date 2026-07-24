import { FaFacebook } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import nic from "@/assets/img/tourn-1.jpg";
import kipaji from "@/assets/img/tourn-2.jpg";

import logo from "@/assets/tournaments/t-logo.png";
import niclogo from "@/assets/tournaments/Competely removed BG.png";
import about from "@/assets/tournaments/about.jpeg";
import { TournamentData } from "../types/scores";

export const navigation = [
  {
    id: 1,
    name: "home",
    target: "home",
    offset: -100,
  },
  { id: 2, name: "about", target: "about", offset: -80 },
  { id: 3, name: "FAQs", target: "faqs", offset: -90 },
  { id: 4, name: "Contacts", target: "contacts", offset: 0 },
];

export const tournaments = [
  {
    id: 1,
    title: "Nairobi International Cup",
    edition: 2024,
    dates: "15th - 18th August, 2024",
    img: nic,
  },
  {
    id: 2,
    title: "Rausha Kipaji Cup",
    edition: 2023,
    dates: "18th - 21st April, 2024",
    img: kipaji,
  },
];

export const tournaData: TournamentData = {
  "Tisini Crucial Cup": {
    logo: logo,
    hero: {
      title: "Rausha Kipaji Cup",
      subtitle: "Africa's premier youth football tournament",
      buttonText: "18th - 21st April, 2024",
    },
    about: {
      theme: "2024 Focus –Going Green Through Sports!",
      image: about,
      story: [
        `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              molestias repellendus facere accusamus voluptatem illum doloremque
              voluptates, incidunt ut porro ex exercitationem qui nesciunt odit
              cumque iusto laboriosam ducimus facilis accusantium eveniet
              pariatur et saepe quo? Accusantium quia quas provident quam
              placeat, obcaecati quis quo quisquam! Saepe perferendis magnam
              earum vitae? Cumque expedita mollitia enim delectus et fugiat
              rerum nostrum adipisci numquam veritatis autem laboriosam,
              aspernatur corporis libero vel dolor quas alias, molestiae
              consequuntur dolorum. Minima perferendis harum, consequuntur ut
              facere magni quas soluta vel nisi rem voluptates ducimus dolorem
              tenetur. Sequi provident vel, reprehenderit ducimus vitae odio
              sunt laboriosam?`,
      ],
    },

    questions: [
      {
        id: 1,
        question: "What are the dates of the tournament?",
        answer: "Thursday 18th April – Sunday 21st of April, 2024",
      },
      {
        id: 2,
        question: "Where will tisini crucial take place?",
        answer:
          "Nakuru Boys High School and Nakuru Girls High School, in Nakuru County, Kenya.",
      },
      {
        id: 3,
        question: "What are the age categories?",
        answer: "U7, U9, U11, U13, U15, U17 and U20.",
      },
      {
        id: 4,
        question: "How many people will be involved?",
        answer:
          "7,600 Participants (players, coaches, referees, parents, fans, service providers, and stakeholders)",
      },
      {
        id: 5,
        question: "Will there be media coverage?",
        answer:
          "Yes, local and national newspapers, television stations, and radio stations will be present.",
      },
      {
        id: 6,
        question: "What about international coverage?",
        answer:
          "Through our social media platforms, international audience will be able to follow all the action live.",
      },
    ],

    footer: {
      logo: logo,
      socials: [
        {
          name: "facebook",
          icon: FaFacebook,
          link: "https://web.facebook.com/profile.php?id=100063722136488&mibextid=ZbWKwL&_rdc=1&_rdr",
        },
        {
          name: "twitter",
          icon: FaXTwitter,
          link: "https://twitter.com/RaushaKipajiCup",
        },
        {
          name: "instagram",
          icon: FaInstagram,
          link: "https://www.instagram.com/raushakipajicup/?utm_source=qr&igsh=MXJ2OHVyNzFxZTRyMA%3D%3D",
        },
        {
          name: "linkedin",
          icon: FaLinkedinIn,
          link: "https://www.linkedin.com/in/rausha-kipaji-cup-2657572aa/",
        },
      ],

      contacts: [
        { icon: FaPhoneAlt, contact: "+254 723 803355,  +254 723 158975" },
        { icon: FaWhatsapp, contact: "+254 720 435886,  +47 944 49 948" },
        {
          icon: MdEmail,
          contact: "info@raushakipaji.com",
        },
      ],
    },
  },
  "Nairobi International Cup": {
    logo: niclogo,
    hero: {
      title: "Nairobi International Cup",
      subtitle: "A soccer festival in a vibrant city!",
      buttonText: "15th - 18th August, 2024",
    },
    about: {
      theme:
        "Celebrating the community that made us and one that we owe a lifetime of service",
      image: about,
      story: [
        `The Nairobi International Cup, is a program that aims to
celebrate the beautiful game annually while leaving behind a
legacy that will connect this game we all love to the
community creating an impact which will inspire hope and
create incredible stories of great sports men.`,

        `The main objective is to reach kids, youth and coaches at
the grassroot level who struggle everyday to get footballs,
basic training equipment, kits and soccer boots. This is a
program that comes in as a partner, as a well wisher and
as a friend that will always be around to give them a
hand. From Nairobi to Isiolo, From Lamu to Sindo, From
Lodwar to Busia, From Siaya to Eldoret, we will endeavor
to reach the kids and grassroot coaches who do so much
to make these kids happy and show them a way out of
their present life situations through sports.
Football kit, soccer boots, footballs, and cones will be
donated. All in the spirit of elevating the game that has
given us so much while lending a helping hand to the
community that made all of us.`,

        `This is the Ultimate NIC Promise and will be delivered. The
game needs us. All of us. Together we will achieve it.`,
      ],
    },
    questions: [
      {
        id: 1,
        question: "What are the dates of the tournament?",
        answer: "Thursday 15th August – Sunday 18th of August, 2024",
      },
      {
        id: 2,
        question: "Where will Nairobi International Cup take place?",
        answer:
          "Lenana School and St. Mary’s School, in Nairobi County, Kenya.",
      },
      {
        id: 3,
        question: "What are the age categories?",
        answer: `Boys: U7, U9, U11, U13, U15, U17 and U20. \nGirls: U15, U17 and U20.`,
      },
      {
        id: 4,
        question: "How many people will be involved?",
        answer:
          "The Event will feature over 300 teams making it over 8000 kids and youth coming together for a common goal - to enjoy and celebrate a game we all love. A game that has given us so much. This will also provide a perfect platform to open up our city and showcase its warmth, vibrancy to all our guests.",
      },
      {
        id: 5,
        question: "Will there be media coverage?",
        answer:
          "Yes, local and national newspapers, television stations, and radio stations will be present.",
      },
      {
        id: 6,
        question: "What about international coverage?",
        answer:
          "Through our social media platforms, international audience will be able to follow all the action live.",
      },
    ],

    footer: {
      logo: niclogo,
      socials: [
        {
          name: "facebook",
          icon: FaFacebook,
          link: "",
        },
        {
          name: "twitter",
          icon: FaXTwitter,
          link: "",
        },
        {
          name: "instagram",
          icon: FaInstagram,
          link: "",
        },
        {
          name: "linkedin",
          icon: FaLinkedinIn,
          link: "",
        },
      ],

      contacts: [
        { icon: FaPhoneAlt, contact: "+254 000 000000,  +254 000 000000" },
        { icon: FaWhatsapp, contact: "+254 000 000000,  +47 000 000000" },
        {
          icon: MdEmail,
          contact: "info@nic.com",
        },
      ],
    },
  },
};
