/**
 * Chat assistant data — knowledge base, quick replies, and contact info.
 *
 * Edit this file to add/change what the chat widget knows.
 * No component code changes needed for new Q&A entries.
 */

import { fuzzy } from "fast-fuzzy";

/**
 * How close a typed word needs to be to a keyword (0–1, higher = stricter)
 * before the typo-tolerant fallback accepts it. 0.75 catches things like
 * "lacotions" → "locations" without matching genuinely unrelated words.
 * Lower it if real typos are being missed; raise it if wrong replies fire.
 */
const FUZZY_THRESHOLD = 0.75;

export const SALES_PHONE = "+8801304610108";

export const SALES_WHATSAPP = "8801304610108"; // digits only, no +

export const SALES_EMAIL =
  "[hello@listeasybd.com](mailto:hello@listeasybd.com)";

export const QUICK_REPLIES = [
  "Browse properties",
  "Browse projects",
  "Find a property for me",
  "Book a site visit",
  "Talk to a human",
];

export const GREETING_MESSAGE =
  "Hi! 👋 I'm the ListEasy property assistant. I can help you find properties, compare projects, understand pricing, financing, site visits, and more. What are you looking for today?";

export const FALLBACK_REPLY =
  "I don't have a clear answer for that yet. 😊 A ListEasy property advisor can help you directly on WhatsApp or by phone.";

/**
 * Chat rule structure.
 */
export interface ChatRule {
  keywords: string[];
  reply: string;
}

/**
 * Keyword → answer rules.
 *
 * Rules are no longer "first match wins by list position" — matching is
 * word-boundary based and the MOST SPECIFIC (longest) matching keyword
 * phrase wins, no matter where the rule sits in this file. That means you
 * can freely add more specific rules anywhere without worrying about a
 * generic rule earlier in the list stealing the match.
 *
 * TIP:
 * Still group related rules together for readability, but you no longer
 * need to obsess over ordering for matching purposes.
 */

export const CHAT_RULES: ChatRule[] = [
  // ---------------------------------------------------------------------------
  // GREETINGS & GENERAL CONVERSATION
  // ---------------------------------------------------------------------------

  {
    keywords: ["assalamualaikum", "assalamu alaikum", "salam", "আসসালামু"],
    reply:
      "Walaikum Assalam! 😊 Welcome to ListEasy. How can I help you today — looking to buy, rent, sell, or invest in property?",
  },

  {
    keywords: ["hi", "hello", "hey", "helo"],
    reply:
      "Hey! 👋 Welcome to ListEasy. Tell me what you're looking for — an apartment, house, land, commercial space, rental property, or a new project.",
  },

  {
    keywords: ["how are you", "how r u", "kemon acho"],
    reply:
      "I'm doing great — and ready to help you find the right property! 😊 What are you looking for?",
  },

  {
    keywords: ["thank", "thanks", "dhonnobad", "ধন্যবাদ"],
    reply:
      "You're very welcome! 😊 If you need help finding, comparing, or visiting a property, just ask.",
  },

  {
    keywords: ["bye", "goodbye", "see you", "good night"],
    reply:
      "Take care! 👋 Come back anytime — I'm here 24/7 to help with your property search.",
  },

  {
    keywords: ["who are you", "what are you"],
    reply:
      "I'm the ListEasy virtual property assistant. I can help you explore properties and projects, understand prices, financing, locations, amenities, site visits, and connect you with a property advisor.",
  },

  {
    keywords: ["what can you do", "help me", "help"],
    reply:
      "I can help with:\n\n• Finding properties\n• New projects & apartments\n• Rent and sale listings\n• Prices & budgets\n• EMI & financing\n• Site visits\n• Locations & neighborhoods\n• Property documents\n• Investment questions\n• Connecting you with an advisor\n\nJust tell me what you're looking for! 😊",
  },

  // ---------------------------------------------------------------------------
  // PROPERTY SEARCH INTENT
  // ---------------------------------------------------------------------------

  {
    keywords: [
      "find property",
      "find me",
      "looking for",
      "search property",
      "need a property",
      "property for me",
    ],
    reply:
      "I'd love to help you find the right property! 🏠 Tell me a few things: preferred area, your budget, whether you want to buy or rent, and the type of property you're looking for.",
  },

  {
    keywords: ["apartment", "flat", "condo"],
    reply:
      "We have apartments across different areas and budgets. 😊 Tell me your preferred location, budget, and how many bedrooms you need, and I can guide you toward suitable listings.",
  },

  {
    keywords: ["house", "villa", "duplex"],
    reply:
      "Looking for a house, villa, or duplex? Great! Tell me your preferred area, budget, and approximate size or bedroom requirement.",
  },

  {
    keywords: ["land", "plot", "jomi", "জমি"],
    reply:
      "We can help you explore land and plot opportunities too. Tell me the preferred area, approximate land size, intended use, and your budget.",
  },

  {
    keywords: ["commercial", "office space", "shop", "showroom", "warehouse"],
    reply:
      "Looking for commercial property? Tell me whether you need an office, shop, showroom, or warehouse — along with your preferred location and budget.",
  },

  {
    keywords: ["studio", "small apartment"],
    reply:
      "For a studio or compact apartment, tell me your preferred area and budget. I can guide you to relevant available listings.",
  },

  // ---------------------------------------------------------------------------
  // BUYING / SELLING / RENTING
  // ---------------------------------------------------------------------------

  {
    keywords: ["for rent", "rental", "rent property", "ভাড়া"],
    reply:
      "Yes, ListEasy includes rental properties. 🏠 Set Purpose to “For Rent” in the property filters, then choose your preferred area, property type, and budget.",
  },

  {
    keywords: ["rent", "rented", "monthly rent"],
    reply:
      "Rental prices depend on location, property size, condition, and amenities. Browse our Properties page and filter by “For Rent” to see current options.",
  },

  {
    keywords: ["buy", "purchase", "for sale", "kinbo", "কিনবো"],
    reply:
      "Looking to buy? You can explore ready properties on the Properties page or new developments on the Projects page. Tell me your area and budget and I can help narrow your options.",
  },

  {
    keywords: ["sell property", "sell my property", "selling"],
    reply:
      "Want to sell a property? Our team can help you understand the listing process and connect you with potential buyers. Contact a ListEasy property advisor to get started.",
  },

  {
    keywords: ["list my property", "add property", "post property"],
    reply:
      "Interested in listing your property on ListEasy? Great! 😊 A property advisor can guide you through submitting property details, photos, pricing, and required information.",
  },

  {
    keywords: ["owner", "property owner"],
    reply:
      "If you're a property owner and want to list, sell, or rent out your property, a ListEasy advisor can guide you through the process.",
  },

  {
    keywords: ["broker", "agent", "real estate agent"],
    reply:
      "Are you looking for a property agent, or are you an agent interested in working with ListEasy? Let me know and I'll point you in the right direction.",
  },

  // ---------------------------------------------------------------------------
  // PRICE & BUDGET
  // ---------------------------------------------------------------------------

  {
    keywords: ["price", "cost", "koto", "taka", "দাম", "কত"],
    reply:
      "Prices vary depending on the property, location, size, developer, and project stage. Exact prices are shown on individual listing and project pages.",
  },

  {
    keywords: ["budget", "affordable", "cheap", "low price"],
    reply:
      "We can help you search within your budget. 💰 Tell me your maximum budget and preferred location, and you can use our price filters to narrow down options.",
  },

  {
    keywords: ["under 50 lakh", "under 1 crore", "within budget"],
    reply:
      "You can use the price filter to search properties within your budget. If you tell me your maximum budget and preferred area, I can guide your search better.",
  },

  {
    keywords: ["negotiable", "negotiate", "negotiation"],
    reply:
      "Some property prices may be negotiable depending on the owner, developer, property condition, and demand. A property advisor can help you understand the current situation for a specific listing.",
  },

  {
    keywords: ["discount", "offer", "promotion", "deal"],
    reply:
      "Some developers may run limited-time offers or special payment plans. A ListEasy advisor can share currently available promotions for the project you're interested in.",
  },

  // ---------------------------------------------------------------------------
  // LOCATIONS & AREAS
  // ---------------------------------------------------------------------------

  {
    keywords: ["gulshan"],
    reply:
      "Gulshan is one of Dhaka's premium residential and commercial areas. You can filter available properties and projects by Gulshan to explore current listings.",
  },

  {
    keywords: ["banani"],
    reply:
      "Banani offers a mix of premium apartments, commercial spaces, restaurants, and offices. Use the area filter to explore available properties there.",
  },

  {
    keywords: ["dhanmondi"],
    reply:
      "Dhanmondi is a popular central residential area with schools, hospitals, restaurants, and strong connectivity. Check our listings for currently available properties.",
  },

  {
    keywords: ["uttara"],
    reply:
      "Uttara offers a wide range of apartments and properties across different budgets. You can filter by sector, price, property type, and bedrooms.",
  },

  {
    keywords: ["bashundhara"],
    reply:
      "Bashundhara Residential Area is popular for modern apartments, larger homes, and planned community living. Browse current listings to see available options.",
  },

  {
    keywords: ["mirpur"],
    reply:
      "Mirpur has a wide range of residential options and different price points. Use the location and budget filters to explore suitable properties.",
  },

  {
    keywords: ["mohammadpur"],
    reply:
      "Mohammadpur offers established residential neighborhoods with apartments across different sizes and budgets. Browse current listings for availability.",
  },

  {
    keywords: ["purbachal"],
    reply:
      "Purbachal is a major planned development area and is popular for land, future residential projects, and long-term investment opportunities.",
  },

  {
    keywords: ["dhaka", "location", "area", "where is"],
    reply:
      "ListEasy helps you explore properties across Dhaka and surrounding areas. Popular locations include Gulshan, Banani, Dhanmondi, Uttara, Bashundhara, Mirpur, Mohammadpur, Purbachal, and more.",
  },

  // ---------------------------------------------------------------------------
  // PROJECTS & DEVELOPERS
  // ---------------------------------------------------------------------------

  {
    keywords: ["project", "new project", "development"],
    reply:
      "You can explore ongoing and upcoming real estate projects on our Projects page. Each project includes location, unit types, pricing, amenities, payment plans, construction progress, and handover information.",
  },

  {
    keywords: ["developer", "builder", "construction company"],
    reply:
      "Each project page includes information about the developer. We recommend reviewing the developer's track record, completed projects, delivery history, and project details before making a decision.",
  },

  {
    keywords: ["under construction", "ongoing project"],
    reply:
      "Under-construction projects can offer flexible payment plans and early-stage pricing. Check the project page for construction progress, expected completion, unit availability, and payment details.",
  },

  {
    keywords: ["upcoming", "coming soon", "future project"],
    reply:
      "Upcoming projects may have limited early information until official launch. You can browse available project listings or contact an advisor for the latest details.",
  },

  {
    keywords: ["ready flat", "ready apartment", "ready property"],
    reply:
      "For ready properties, check the Properties page and filter based on your preferred location, budget, bedrooms, and property type.",
  },

  // ---------------------------------------------------------------------------
  // SITE VISITS & VIEWINGS
  // ---------------------------------------------------------------------------

  {
    keywords: [
      "book site visit",
      "schedule visit",
      "book a visit",
      "site visit",
    ],
    reply:
      "Absolutely! 🏠 You can book a site visit from the project or property page. Choose your preferred date and contact details, and a property advisor will confirm the appointment.",
  },

  {
    keywords: ["visit", "tour", "viewing", "walkthrough", "see property"],
    reply:
      "You can request a viewing or private site visit for a property or project. Open the listing and use the site visit option to share your preferred date.",
  },

  {
    keywords: ["virtual tour", "video tour", "online tour"],
    reply:
      "If a property has a virtual or video tour available, you'll find it on the listing page. For additional photos or viewing assistance, a property advisor can help.",
  },

  {
    keywords: ["weekend visit", "friday visit", "saturday visit"],
    reply:
      "Weekend availability depends on the property and developer. Submit your preferred date when booking a site visit, and an advisor will confirm the available time.",
  },

  // ---------------------------------------------------------------------------
  // FINANCING & EMI
  // ---------------------------------------------------------------------------

  {
    keywords: ["loan", "emi", "finance", "bank", "mortgage", "installment"],
    reply:
      "Many projects may support bank financing or installment plans. Use the EMI calculator on a project page to estimate your monthly payment based on price, down payment, interest rate, and loan tenure.",
  },

  {
    keywords: ["emi calculator", "calculate emi", "monthly payment"],
    reply:
      "The EMI calculator lets you estimate your monthly payment. Enter the property price, down payment, interest rate, and repayment period to get an estimate.",
  },

  {
    keywords: ["down payment", "booking amount", "advance"],
    reply:
      "Down payment and booking amounts vary by project and developer. Check the project's Payment Plan section for the exact breakdown.",
  },

  {
    keywords: ["payment plan", "payment schedule"],
    reply:
      "Payment schedules differ between projects. Open the project page and look for the Payment Plan section to see booking amounts, installments, and other payment milestones.",
  },

  {
    keywords: ["interest rate"],
    reply:
      "Loan interest rates depend on the bank, loan product, borrower profile, and current market conditions. Contact your preferred bank or a property advisor for current options.",
  },

  // ---------------------------------------------------------------------------
  // PROPERTY DETAILS
  // ---------------------------------------------------------------------------

  {
    keywords: ["bedroom", "bedrooms", "bhk", "unit type"],
    reply:
      "Bedroom configurations and unit types vary by property and project. Check the listing or project's Unit Types section for available layouts and pricing.",
  },

  {
    keywords: ["sqft", "square feet", "size", "area size"],
    reply:
      "Property size is listed in square feet on each property and project page. You can also use filters to search by your preferred size range.",
  },

  {
    keywords: ["floor plan", "floorplan", "layout"],
    reply:
      "Floor plans are available on project pages when provided by the developer. You can view layouts for different unit types and bedroom configurations.",
  },

  {
    keywords: ["floor", "which floor"],
    reply:
      "For individual property listings, floor information is shown in the property details. Availability may vary depending on the building or project.",
  },

  {
    keywords: ["facing", "south facing", "north facing"],
    reply:
      "Property orientation or facing may be listed in the property details when available. Check the listing specifications or ask an advisor for confirmation.",
  },

  {
    keywords: ["balcony"],
    reply:
      "Balcony availability and size depend on the specific unit layout. Check the floor plan or property details for the exact configuration.",
  },

  {
    keywords: ["lift", "elevator"],
    reply:
      "Lift and elevator information is listed under building features or amenities when available.",
  },

  {
    keywords: ["parking", "car parking", "garage"],
    reply:
      "Parking availability varies by property and project. Check the amenities or property details to see whether parking is included, optional, or available at an additional cost.",
  },

  {
    keywords: ["security", "safe", "safety", "guard"],
    reply:
      "Security features vary by property. Many modern projects include security services, controlled access, CCTV, or guards. Check the specific property's Amenities section.",
  },

  {
    keywords: ["pool", "swimming pool"],
    reply:
      "Swimming pool availability depends on the project. Check the Amenities section of the project page for included facilities.",
  },

  {
    keywords: ["gym", "fitness"],
    reply:
      "Gym and fitness facilities vary by project. Open the project page and check the listed amenities.",
  },

  {
    keywords: ["garden", "rooftop", "playground"],
    reply:
      "Outdoor facilities such as gardens, rooftops, children's areas, and playgrounds depend on the project. Check the Amenities & Features section for details.",
  },

  {
    keywords: ["amenities", "facilities", "features"],
    reply:
      "Amenities vary by property and project. Common features may include parking, security, lifts, gyms, rooftops, gardens, community spaces, and more.",
  },

  // ---------------------------------------------------------------------------
  // HANDOVER & CONSTRUCTION
  // ---------------------------------------------------------------------------

  {
    keywords: ["handover", "possession", "completion"],
    reply:
      "Expected handover or completion information is shown on the individual project page. Construction schedules may change, so check the latest project details or speak with an advisor.",
  },

  {
    keywords: ["construction progress", "progress", "construction update"],
    reply:
      "For ongoing projects, construction progress may be available on the project page. This helps you understand the current stage of development.",
  },

  {
    keywords: ["ready to move", "move in"],
    reply:
      "If a property is ready for occupancy, that should be mentioned in its listing details. You can also contact an advisor to confirm move-in availability.",
  },

  // ---------------------------------------------------------------------------
  // DOCUMENTS & LEGAL QUESTIONS
  // ---------------------------------------------------------------------------

  {
    keywords: ["document", "documents", "papers", "paperwork"],
    reply:
      "Property documents can vary depending on the property type and transaction. A ListEasy advisor can help explain the relevant documents for the property you're interested in.",
  },

  {
    keywords: ["registration", "register property"],
    reply:
      "Registration requirements and costs depend on the property and transaction. We recommend discussing the specific property with a qualified advisor or legal professional before proceeding.",
  },

  {
    keywords: ["mutation", "namjari", "নামজারি"],
    reply:
      "Mutation and ownership record processes depend on the property's documentation and local land administration requirements. A property advisor can guide you toward the appropriate next steps.",
  },

  {
    keywords: ["deed", "dalil", "দলিল"],
    reply:
      "Ownership and deed verification are important before purchasing property. For a specific property, we recommend reviewing documents carefully with an appropriate qualified professional.",
  },

  {
    keywords: ["legal", "lawyer", "verification"],
    reply:
      "For legal verification, ownership checks, or document review, it's best to consult a qualified professional. A ListEasy advisor can help explain the general process for the property you're considering.",
  },

  {
    keywords: ["ownership", "owner verification", "real owner"],
    reply:
      "Verifying ownership is an important step before any property transaction. Make sure the relevant documents and records are reviewed appropriately before proceeding.",
  },

  // ---------------------------------------------------------------------------
  // INVESTMENT
  // ---------------------------------------------------------------------------

  {
    keywords: ["investment", "invest", "investing"],
    reply:
      "Property investment depends on your goals — rental income, long-term appreciation, land investment, or future occupancy. Tell me your budget and investment goal, and I can help you explore suitable options.",
  },

  {
    keywords: ["roi", "return", "rental yield"],
    reply:
      "Potential returns depend on purchase price, rental demand, location, maintenance costs, financing, and future market conditions. Property investments involve risk, so it's important to evaluate each opportunity carefully.",
  },

  {
    keywords: ["best area to invest", "best investment area"],
    reply:
      "The best location depends on your investment strategy, budget, timeline, and risk tolerance. Areas with strong infrastructure, connectivity, rental demand, and future development can be worth researching.",
  },

  {
    keywords: ["rental income", "earn rent"],
    reply:
      "Rental income depends on the property's location, size, condition, furnishing, demand, and local market conditions. You can compare similar rental listings to estimate potential income.",
  },

  // ---------------------------------------------------------------------------
  // PROPERTY COMPARISON
  // ---------------------------------------------------------------------------

  {
    keywords: ["compare", "comparison", "which is better"],
    reply:
      "You can compare properties based on price, location, size, bedrooms, amenities, developer, handover status, and payment plans. Add suitable properties to your shortlist and compare the details.",
  },

  {
    keywords: ["shortlist", "save property", "favorite"],
    reply:
      "You can save properties you're interested in to your shortlist so it's easier to compare them later.",
  },

  {
    keywords: ["similar property", "similar properties"],
    reply:
      "You can browse similar properties based on location, type, size, and price. Check related listings or adjust the filters to explore alternatives.",
  },

  // ---------------------------------------------------------------------------
  // AVAILABILITY
  // ---------------------------------------------------------------------------

  {
    keywords: ["available", "availability", "is it available"],
    reply:
      "Availability can change quickly. Check the latest status on the property or project page, or contact an advisor to confirm before making plans.",
  },

  {
    keywords: ["sold", "booked"],
    reply:
      "If a property or unit is already sold or booked, similar options may still be available. Browse related listings or contact an advisor for alternatives.",
  },

  {
    keywords: ["last unit", "few units"],
    reply:
      "Limited availability can change quickly. Please confirm the latest unit status with a property advisor.",
  },

  // ---------------------------------------------------------------------------
  // FOREIGN / NRB BUYERS
  // ---------------------------------------------------------------------------

  {
    keywords: ["nrb", "foreign buyer", "abroad", "expat"],
    reply:
      "If you're living abroad and interested in property in Bangladesh, a ListEasy advisor can help explain the available options, project information, documentation process, and remote communication.",
  },

  {
    keywords: ["buy from abroad", "purchase from abroad"],
    reply:
      "Buying property while living abroad may involve additional documentation and transaction considerations. A property advisor can guide you through the general process for a specific property.",
  },

  // ---------------------------------------------------------------------------
  // FEES & COSTS
  // ---------------------------------------------------------------------------

  {
    keywords: ["registration cost", "extra cost", "additional cost"],
    reply:
      "The total purchase cost can include more than the property price, depending on the transaction. Ask an advisor about applicable registration, legal, service, parking, utility, or other charges for a specific property.",
  },

  {
    keywords: ["service charge", "maintenance fee"],
    reply:
      "Maintenance and service charges vary by building and project. Check the property details or ask an advisor about the applicable monthly or periodic costs.",
  },

  {
    keywords: ["utility", "electricity", "gas", "water"],
    reply:
      "Utility arrangements vary by property and building. Check the listing details or ask an advisor about electricity, gas, water, internet, and backup power availability.",
  },

  // ---------------------------------------------------------------------------
  // BROCHURE & MEDIA
  // ---------------------------------------------------------------------------

  {
    keywords: ["brochure", "pdf", "download brochure"],
    reply:
      "If a brochure is available for a project, you'll find it on the project page. Otherwise, a property advisor may be able to share additional project information.",
  },

  {
    keywords: ["more photos", "pictures", "images"],
    reply:
      "Available property photos are shown on the listing page. If you need more information or want to arrange a viewing, a property advisor can help.",
  },

  {
    keywords: ["video", "video tour"],
    reply:
      "Video or virtual tours may be available for selected properties. Check the listing page for available media.",
  },

  // ---------------------------------------------------------------------------
  // ACCOUNT & WEBSITE SUPPORT
  // ---------------------------------------------------------------------------

  {
    keywords: ["account", "login", "sign in"],
    reply:
      "You can sign in to manage your saved properties, activity, and account features. If you're having trouble logging in, try resetting your password or contact support.",
  },

  {
    keywords: ["forgot password", "reset password"],
    reply:
      "Use the “Forgot password” option on the sign-in page to reset your password.",
  },

  {
    keywords: ["website problem", "bug", "not working", "error"],
    reply:
      "Sorry you're having trouble! Please tell me what isn't working and, if possible, what page or action caused the issue. Our team can investigate.",
  },

  // ---------------------------------------------------------------------------
  // BUSINESS / PARTNERSHIP
  // ---------------------------------------------------------------------------

  {
    keywords: ["partnership", "partner", "collaboration"],
    reply:
      "Interested in working with ListEasy? We'd be happy to hear from you. Contact our team with a brief description of your company or partnership idea.",
  },

  {
    keywords: ["advertise", "advertising", "promote project"],
    reply:
      "If you'd like to promote a property, project, or real estate business through ListEasy, contact our team to discuss available opportunities.",
  },

  {
    keywords: ["developer partnership", "list project"],
    reply:
      "Developers interested in listing or promoting projects on ListEasy can contact our business team for onboarding information.",
  },

  // ---------------------------------------------------------------------------
  // OFFICE & CONTACT
  // ---------------------------------------------------------------------------

  {
    keywords: ["email"],
    reply: `You can reach us by email at ${SALES_EMAIL}.`,
  },

  {
    keywords: ["office", "address"],
    reply:
      "For office or meeting information, please contact our team directly and an advisor can share the appropriate details.",
  },

  {
    keywords: ["hour", "hours", "open", "timing"],
    reply:
      "Our advisor availability may vary, but you can send us a message anytime. We'll respond as soon as a team member is available.",
  },

  {
    keywords: [
      "talk to human",
      "human",
      "advisor",
      "agent",
      "contact",
      "call",
      "phone",
    ],
    reply: `Of course! 😊 You can reach a ListEasy property advisor at ${SALES_PHONE}, or use WhatsApp for a quicker conversation.`,
  },

  // ---------------------------------------------------------------------------
  // LONG-TAIL BUYER / CLIENT INTENT
  // ---------------------------------------------------------------------------

  {
    keywords: [
      "i want to buy a property",
      "i want to buy property",
      "i want to purchase a property",
      "looking to buy property",
      "looking to purchase",
      "i am looking for a property",
      "i'm looking for a property",
      "need to buy a property",
      "help me buy a property",
      "want to purchase flat",
      "want to buy flat",
      "want to buy apartment",
    ],
    reply:
      "Absolutely! 😊 I can help you narrow down suitable properties. Please share your preferred location, approximate budget, property type, and number of bedrooms. If you're flexible, tell me your priorities and we'll guide you from there.",
  },

  {
    keywords: [
      "i have a budget",
      "my budget is",
      "budget is",
      "i can spend",
      "i can afford",
      "my maximum budget",
      "budget range",
      "within my budget",
      "what can i get for",
      "what property can i get",
    ],
    reply:
      "Great! 💰 Tell me your approximate budget, preferred area, and property type. I can help you understand what kind of properties or projects may fit your requirements.",
  },

  {
    keywords: [
      "2 bedroom for family",
      "3 bedroom for family",
      "4 bedroom for family",
      "family apartment",
      "family flat",
      "flat for family",
      "apartment for family",
      "home for family",
      "family home",
    ],
    reply:
      "For a family home, we can narrow options by bedrooms, location, size, budget, parking, amenities, and nearby facilities. Tell me your preferred area, budget, and bedroom requirement.",
  },

  {
    keywords: [
      "i need a 2 bedroom",
      "i need a 3 bedroom",
      "i need a 4 bedroom",
      "need 2 bedroom flat",
      "need 3 bedroom flat",
      "need 4 bedroom flat",
      "looking for 2 bedroom",
      "looking for 3 bedroom",
      "looking for 4 bedroom",
    ],
    reply:
      "Sure! 🏠 Tell me your preferred location and budget, and I'll help you narrow down suitable 2, 3, or 4-bedroom options.",
  },

  {
    keywords: [
      "property near me",
      "property nearby",
      "flat near me",
      "apartment near me",
      "homes near me",
      "properties around me",
      "nearby property",
    ],
    reply:
      "I can help you search by location. 📍 Tell me the area or neighborhood you're interested in, along with your budget and preferred property type.",
  },

  {
    keywords: [
      "show me properties",
      "show me property",
      "show properties",
      "show flats",
      "show apartments",
      "show houses",
      "send me properties",
      "send some properties",
      "give me some options",
      "show me some options",
    ],
    reply:
      "Of course! 😊 Tell me your preferred location, budget, and property type. I'll help you narrow down the most relevant options.",
  },

  {
    keywords: [
      "send property details",
      "send me property details",
      "share property details",
      "share details",
      "more details about property",
      "i want property details",
      "can you send details",
      "can i get details",
    ],
    reply:
      "Sure! Please tell me which property or project you're interested in. I can help you understand its price, location, size, amenities, payment plan, and other available details.",
  },

  {
    keywords: [
      "i am interested in this property",
      "interested in this property",
      "interested in this flat",
      "interested in this apartment",
      "i like this property",
      "i like this flat",
      "want this property",
      "want to know about this property",
    ],
    reply:
      "Great! 😊 If you're interested in a specific property, I can help with the next steps. You can request a site visit or connect with a ListEasy property advisor for current availability, pricing, and negotiation details.",
  },

  {
    keywords: [
      "is this property genuine",
      "is this property legit",
      "is this listing genuine",
      "is this listing real",
      "is this a genuine property",
      "is this real",
      "can i trust this property",
      "is the property verified",
    ],
    reply:
      "Property verification is very important before making any payment or commitment. Review the property's documents, ownership information, developer details, and available listing information carefully. For a specific property, a ListEasy advisor can explain the available information.",
  },

  {
    keywords: [
      "can i visit tomorrow",
      "visit tomorrow",
      "can i see it tomorrow",
      "can i view tomorrow",
      "want to see property tomorrow",
      "site visit tomorrow",
      "property viewing tomorrow",
    ],
    reply:
      "Absolutely, you can request a site visit for the property or project. 🏠 Submit your preferred date and contact details, and a property advisor will confirm the available time.",
  },

  {
    keywords: [
      "can i visit today",
      "visit today",
      "can i see it today",
      "view property today",
      "site visit today",
      "want to see property today",
    ],
    reply:
      "You can request a viewing today, subject to the property's availability. Please submit a site-visit request or contact a ListEasy advisor so they can confirm the available time.",
  },

  {
    keywords: [
      "i want someone to contact me",
      "please contact me",
      "contact me",
      "call me",
      "please call me",
      "can someone call me",
      "want a callback",
      "request a callback",
      "call back",
    ],
    reply:
      `Of course! 😊 A ListEasy property advisor can contact you. You can reach us at ${SALES_PHONE}, or message us on WhatsApp for a quicker response.`,
  },

  {
    keywords: [
      "i want to talk to sales",
      "talk to sales",
      "contact sales",
      "sales team",
      "speak to sales",
      "sales representative",
      "talk with sales",
      "connect me with sales",
    ],
    reply:
      `Absolutely. 😊 You can contact the ListEasy sales team at ${SALES_PHONE}, or use WhatsApp to discuss your property requirements directly.`,
  },

  {
    keywords: [
      "i want an agent",
      "need an agent",
      "need property agent",
      "find me an agent",
      "connect me to an agent",
      "connect with an agent",
      "property consultant",
      "need a consultant",
      "real estate consultant",
    ],
    reply:
      `Sure! A ListEasy property advisor can help you shortlist properties, arrange visits, and answer project questions. You can contact us at ${SALES_PHONE} or through WhatsApp.`,
  },

  // ---------------------------------------------------------------------------
  // BUYER QUALIFICATION / REQUIREMENTS
  // ---------------------------------------------------------------------------

  {
    keywords: [
      "buying for myself",
      "buying for my family",
      "looking for my family",
      "looking for myself",
      "personal residence",
      "own residence",
      "for living",
      "want to live there",
      "family living",
    ],
    reply:
      "Got it. 🏡 For a home to live in, location, commute, bedrooms, building quality, amenities, parking, and neighborhood are usually important. Tell me your preferred area and budget and I'll help narrow the search.",
  },

  {
    keywords: [
      "buying for investment",
      "buy property as investment",
      "property for investment",
      "investment property",
      "looking for investment",
      "want to invest in property",
      "property investment",
      "invest in flat",
      "invest in land",
    ],
    reply:
      "If you're buying as an investment, we can look at location, rental demand, expected development, property type, entry price, payment terms, and potential resale or rental considerations. Tell me your budget and investment goal.",
  },

  {
    keywords: [
      "cash buyer",
      "pay cash",
      "full cash payment",
      "cash purchase",
      "buy with cash",
      "no loan",
      "without loan",
    ],
    reply:
      "If you're planning a cash purchase, payment terms can vary by property and developer. Share your budget and preferred location, and a ListEasy advisor can help you understand suitable options and payment requirements.",
  },

  {
    keywords: [
      "need bank loan",
      "want bank loan",
      "can i get a loan",
      "property loan",
      "home loan",
      "housing loan",
      "loan for apartment",
      "loan for flat",
      "finance apartment",
    ],
    reply:
      "Many properties and projects may work with bank financing, but eligibility and terms depend on the bank and borrower. Share the property or project you're considering and an advisor can explain the available financing information.",
  },

  {
    keywords: [
      "low down payment",
      "small down payment",
      "minimum down payment",
      "low booking amount",
      "small booking amount",
      "installment facility",
      "easy installment",
      "monthly installment",
    ],
    reply:
      "Payment terms vary by project and developer. Some projects may offer installment plans or different booking/down-payment structures. Check the project's Payment Plan section or speak with an advisor for the exact terms.",
  },

  {
    keywords: [
      "ready flat within budget",
      "ready apartment within budget",
      "ready home within budget",
      "ready property within budget",
      "ready to move apartment",
      "ready to move flat",
      "ready possession flat",
    ],
    reply:
      "Yes, you can search for ready properties based on location, budget, bedrooms, and property type. Tell me your preferred area and maximum budget and I'll help you narrow the search.",
  },

  // ---------------------------------------------------------------------------
  // SELLER / PROPERTY OWNER LEADS
  // ---------------------------------------------------------------------------

  {
    keywords: [
      "i want to sell my property",
      "i want to sell property",
      "want to sell my flat",
      "want to sell my apartment",
      "want to sell my house",
      "want to sell my land",
      "looking to sell",
      "need to sell property",
      "sell my home",
    ],
    reply:
      "Absolutely. If you're looking to sell your property, ListEasy can help you understand the listing process and connect you with the appropriate team. Please share the property type, location, approximate size, and your expected price.",
  },

  {
    keywords: [
      "i want to rent out my property",
      "rent out my property",
      "rent my apartment",
      "rent my flat",
      "rent my house",
      "looking for tenant",
      "need tenant",
      "find tenant",
      "property for rent by owner",
    ],
    reply:
      "We can help you understand the process of listing a property for rent. Please share the property type, location, size, expected monthly rent, and basic details so an advisor can guide you.",
  },

  {
    keywords: [
      "i am a property owner",
      "i own a property",
      "i own an apartment",
      "i own a flat",
      "i own a house",
      "property owner here",
      "owner wants to sell",
      "owner wants to rent",
    ],
    reply:
      "Welcome! 👋 If you're a property owner, you can contact our team about selling or renting your property through ListEasy. An advisor can guide you through the listing requirements and next steps.",
  },

  {
    keywords: [
      "how do i list my property",
      "how can i list my property",
      "how to list my property",
      "list my flat",
      "list my apartment",
      "list my house",
      "list my land",
      "put my property on listeasy",
      "add my property to listeasy",
    ],
    reply:
      "To list your property, you'll need to provide basic property information such as location, type, size, price, photos, and relevant details. Contact a ListEasy advisor and they'll guide you through the listing process.",
  },

  {
    keywords: [
      "what documents do i need to list",
      "documents needed to list property",
      "documents for listing",
      "listing requirements",
      "property listing requirements",
      "what do i need to sell",
      "documents needed to sell",
    ],
    reply:
      "Listing and transaction requirements can vary depending on the property. Typically, accurate property details and relevant ownership/documentation information may be required. Our team can explain the exact requirements for your property.",
  },

  {
    keywords: [
      "how much can i sell my property for",
      "how much is my property worth",
      "property valuation",
      "property value",
      "estimate my property",
      "valuation of my flat",
      "valuation of my apartment",
      "how much is my flat worth",
    ],
    reply:
      "Property value depends on factors such as location, size, floor, condition, age, amenities, parking, demand, and comparable properties. Share the property's location and basic details, and a ListEasy advisor can help you understand the factors affecting its value.",
  },

  {
    keywords: [
      "do you charge for listing",
      "listing fee",
      "property listing fee",
      "is listing free",
      "cost to list property",
      "how much to list property",
      "seller fee",
      "owner fee",
    ],
    reply:
      "Listing or service fees can depend on the type of property and service involved. Please contact the ListEasy team with your property details so we can explain the applicable terms.",
  },

  {
    keywords: [
      "how long does it take to sell",
      "how quickly can i sell",
      "how fast can i sell",
      "want to sell quickly",
      "sell property fast",
      "need to sell urgently",
      "urgent property sale",
    ],
    reply:
      "Selling time depends on location, asking price, property condition, demand, documentation, and market conditions. If you're looking to sell quickly, an advisor can help you understand the factors that may affect the timeline.",
  },

  // ---------------------------------------------------------------------------
  // PROJECT / DEVELOPER LEADS
  // ---------------------------------------------------------------------------

  {
    keywords: [
      "tell me about this project",
      "more about this project",
      "project details",
      "project information",
      "i want project details",
      "send project information",
      "share project information",
    ],
    reply:
      "Sure! 😊 Project information may include location, developer, unit types, prices, amenities, payment plans, construction progress, and expected handover. Tell me which project you're interested in and I can guide you.",
  },

  {
    keywords: [
      "who is the developer",
      "which developer",
      "developer of this project",
      "who developed this",
      "project developer",
      "builder of this project",
      "which company built this",
    ],
    reply:
      "The developer information is available on individual project pages when provided. I recommend checking the developer's track record, completed projects, delivery history, and the specific project's documentation before making a decision.",
  },

  {
    keywords: [
      "when will the project be completed",
      "when is handover",
      "when will i get possession",
      "project completion date",
      "handover date",
      "expected handover",
      "when can i move in",
      "completion timeline",
    ],
    reply:
      "Expected completion or handover information is shown on the project page when available. Construction timelines can change, so it's best to confirm the latest status with a ListEasy advisor before making a commitment.",
  },

  {
    keywords: [
      "is this project approved",
      "project approval",
      "approved project",
      "is the project legal",
      "project documents",
      "developer approval",
      "approved by authority",
    ],
    reply:
      "Approval and documentation should always be verified before purchasing. The exact approvals depend on the project and applicable authorities. For a specific project, review the available documentation and consult a qualified professional where necessary.",
  },

  {
    keywords: [
      "which project should i buy",
      "which project is best",
      "best project for me",
      "recommend a project",
      "recommend property",
      "which property should i buy",
      "help me choose property",
      "help me choose a flat",
    ],
    reply:
      "I'd be happy to help you narrow it down. 😊 Tell me your budget, preferred location, purpose (living or investment), bedroom requirement, and whether you prefer a ready or under-construction property.",
  },

  // ---------------------------------------------------------------------------
  // INFORMATION / MEDIA / FOLLOW-UP LEADS
  // ---------------------------------------------------------------------------

  {
    keywords: [
      "send brochure",
      "can you send brochure",
      "share brochure",
      "project brochure",
      "need brochure",
      "want brochure",
      "send pdf",
      "project pdf",
    ],
    reply:
      "If a brochure is available, it should be available from the relevant project page. If you need a brochure that isn't shown there, contact a ListEasy advisor and they can check whether additional project material is available.",
  },

  {
    keywords: [
      "send location",
      "share location",
      "project location",
      "property location",
      "where exactly is it",
      "exact location",
      "location please",
      "map location",
    ],
    reply:
      "The property's or project's location is shown on its listing or project page when available. If you send me the property or project name, I can guide you to the relevant location information.",
  },

  {
    keywords: [
      "send floor plan",
      "share floor plan",
      "need floor plan",
      "show floor plan",
      "floor plan please",
      "unit layout",
      "show layout",
    ],
    reply:
      "Floor plans are available on project pages when provided by the developer. They can show unit layouts, bedroom configurations, room sizes, and other available details.",
  },

  {
    keywords: [
      "send more pictures",
      "send more photos",
      "more property photos",
      "can i see more photos",
      "show more pictures",
      "need more pictures",
      "additional photos",
      "property images",
    ],
    reply:
      "Sure! 😊 Available photos are shown on the property or project page. If you need additional photos or want to see the property in person, you can contact an advisor or request a site visit.",
  },

  {
    keywords: [
      "i have a question about this property",
      "question about property",
      "question about this listing",
      "need information about this listing",
      "want to know more",
      "need more information",
      "i have an enquiry",
      "property enquiry",
      "property inquiry",
    ],
    reply:
      "Of course! 😊 Tell me what you'd like to know — price, location, size, availability, payment plan, amenities, documents, or site visit — and I'll point you in the right direction.",
  },

  {
    keywords: [
      "i am ready to buy",
      "ready to buy property",
      "ready to purchase",
      "want to buy now",
      "ready to book",
      "ready to book property",
      "want to book flat",
      "want to reserve property",
      "interested to book",
    ],
    reply:
      "That's great! 🎯 Before booking, it's important to confirm the latest price, availability, payment terms, documentation, and other applicable charges. A ListEasy property advisor can guide you through the next steps.",
  },

  {
    keywords: [
      "what should i do next",
      "next step",
      "what is the next step",
      "how do i proceed",
      "how can i proceed",
      "want to proceed",
      "interested what next",
      "how to move forward",
    ],
    reply:
      "The next step depends on what you're interested in. 😊 For a property, you can review the details, confirm availability, request a site visit, and speak with an advisor before making a decision.",
  },
];

/**
 * Find the best matching reply.
 *
 * Matching runs in two passes:
 *
 * 1. Word-boundary, specificity-scored match. Every rule's keywords are
 *    checked as whole words/phrases (never as a raw substring, so "hi"
 *    can't fire on "this" and "land" can't fire on "island"). Whichever
 *    matching keyword is the LONGEST wins the reply — so a specific
 *    long-tail phrase like "i want to sell my property" always beats a
 *    generic single-word rule like "sell", no matter which one appears
 *    earlier in CHAT_RULES.
 * 2. If nothing matched at all, fall back to typo-tolerant fuzzy word
 *    matching, same as before.
 *
 * For a real AI backend later, you can replace this with
 * a fetch() call to your API route.
 */
export function findReply(message: string): string | null {
  const rawLower = message.toLowerCase();
  const messageWordTokens = wordTokenize(rawLower);

  let bestRule: ChatRule | null = null;
  let bestScore = 0;

  for (const rule of CHAT_RULES) {
    for (const keyword of rule.keywords) {
      if (matchesKeyword(rawLower, messageWordTokens, keyword)) {
        // Longer keyword phrases are more specific, so they win over
        // shorter/generic ones regardless of list order.
        if (keyword.length > bestScore) {
          bestScore = keyword.length;
          bestRule = rule;
        }
      }
    }
  }

  if (bestRule) return bestRule.reply;

  // Typo-tolerant fallback — compares each word the user typed against
  // each word in every keyword and picks the closest match, so
  // "lacotions" still matches the "locations" keyword.
  const messageWords = tokenize(message);
  if (messageWords.length === 0) return null;

  let bestFuzzyRule: ChatRule | null = null;
  let bestFuzzyScore = 0;

  for (const rule of CHAT_RULES) {
    for (const keyword of rule.keywords) {
      for (const keywordWord of tokenize(keyword)) {
        for (const messageWord of messageWords) {
          const score = fuzzy(messageWord, keywordWord);
          if (score > bestFuzzyScore) {
            bestFuzzyScore = score;
            bestFuzzyRule = rule;
          }
        }
      }
    }
  }

  return bestFuzzyScore >= FUZZY_THRESHOLD ? (bestFuzzyRule?.reply ?? null) : null;
}

/**
 * Does `keyword` appear in the message as whole word(s)?
 *
 * - Multi-word / single-word ASCII keywords are checked against a
 *   space-joined token list, so "hi" only matches the standalone word
 *   "hi" — never the "hi" inside "this" or "which".
 * - Keywords made of non-Latin script (Bangla, etc.) tokenize to nothing
 *   under the ASCII-only splitter, so those fall back to a direct
 *   substring check on the raw lowercased message.
 */
function matchesKeyword(
  rawLower: string,
  messageWordTokens: string[],
  keyword: string
): boolean {
  const keywordLower = keyword.toLowerCase();
  const keywordTokens = wordTokenize(keywordLower);

  if (keywordTokens.length === 0) {
    return rawLower.includes(keywordLower);
  }

  const haystack = ` ${messageWordTokens.join(" ")} `;
  const needle = ` ${keywordTokens.join(" ")} `;
  return haystack.includes(needle);
}

/** Splits already-lowercased text into ASCII word tokens (no length filter). */
function wordTokenize(lowerText: string): string[] {
  return lowerText.split(/[^a-z0-9]+/).filter(Boolean);
}

/** Lowercases and splits into words, dropping anything too short to be a meaningful fuzzy match (avoids "is"/"to" causing noisy fuzzy hits). */
function tokenize(text: string): string[] {
  return wordTokenize(text.toLowerCase()).filter((word) => word.length >= 3);
}