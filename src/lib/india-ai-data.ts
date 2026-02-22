export type IndiaAiOrganization = {
  id: string
  organization: string
  website: string
  contact: string
  email: string
  linkedin: string
  notes: string
}

export type IndiaAiSection = {
  id: string
  title: string
  count: number
  organizations: IndiaAiOrganization[]
}

export const indiaAiDirectory = {
  "title": "Exhibitor Contact Database",
  "totalOrganizations": 155,
  "sectionCount": 12,
  "sections": [
    {
      "id": "central-government-ministry",
      "title": "CENTRAL GOVERNMENT - MINISTRY",
      "count": 12,
      "organizations": [
        {
          "id": "ministry-of-electronics-and-information-technology-meity",
          "organization": "Ministry of Electronics and Information Technology (MeitY)",
          "website": "https://www.meity.gov.in",
          "contact": "Minister's Office: +91-11-24301851",
          "email": "secretary@meity.gov.in",
          "linkedin": "linkedin.com/company/meity-in",
          "notes": "Key decision-maker for digital India, AI policy, and IT audit mandates"
        },
        {
          "id": "ministry-of-education",
          "organization": "Ministry of Education",
          "website": "https://www.education.gov.in",
          "contact": "+91-11-23383936",
          "email": "secy.edu@nic.in",
          "linkedin": "linkedin.com/company/ministry-of-education-government-of-india",
          "notes": "EdTech, AI in education, student data audit opportunities"
        },
        {
          "id": "ministry-of-panchayati-raj",
          "organization": "Ministry of Panchayati Raj",
          "website": "https://panchayatiraj.gov.in",
          "contact": "+91-11-23387782",
          "email": "secypr@nic.in",
          "linkedin": "linkedin.com/company/ministryofpanchayatiraj",
          "notes": "Rural digital governance, e-GramSwaraj auditing"
        },
        {
          "id": "ministry-of-skill-development-and-entrepreneurship",
          "organization": "Ministry of Skill Development and Entrepreneurship",
          "website": "https://www.msde.gov.in",
          "contact": "+91-11-26162519",
          "email": "ps.secy-msde@gov.in",
          "linkedin": "linkedin.com/company/ministry-of-skill-development-and-entrepreneurship-india",
          "notes": "Skill India Digital, AI-based training platform audits"
        },
        {
          "id": "ministry-of-steel",
          "organization": "Ministry of Steel",
          "website": "https://steel.gov.in",
          "contact": "+91-11-23062902",
          "email": "secy-steel@nic.in",
          "linkedin": "linkedin.com/company/ministry-of-steel",
          "notes": "Smart manufacturing, AI for steel production optimization"
        },
        {
          "id": "dept-of-food-and-public-distribution-mocafpd",
          "organization": "Dept. of Food and Public Distribution (MoCAFPD)",
          "website": "https://dfpd.gov.in",
          "contact": "+91-11-23070637",
          "email": "secy-ca@nic.in",
          "linkedin": "",
          "notes": "Food supply chain digital audit, PDS technology systems"
        },
        {
          "id": "ministry-of-rural-development",
          "organization": "Ministry of Rural Development",
          "website": "https://rural.nic.in",
          "contact": "+91-11-23386084",
          "email": "secy-rd@nic.in",
          "linkedin": "linkedin.com/company/ministry-of-rural-development",
          "notes": "MGNREGA digital systems, AI for rural welfare audit"
        },
        {
          "id": "ministry-of-agriculture-and-farmers-welfare",
          "organization": "Ministry of Agriculture and Farmers Welfare",
          "website": "https://agricoop.nic.in",
          "contact": "+91-11-23382651",
          "email": "secy-agri@gov.in",
          "linkedin": "linkedin.com/company/agrigoi",
          "notes": "AgriStack, digital crop monitoring, AI for farming"
        },
        {
          "id": "ministry-of-tribal-affairs",
          "organization": "Ministry of Tribal Affairs",
          "website": "https://tribal.nic.in",
          "contact": "+91-11-23387529",
          "email": "secy.tribal@nic.in",
          "linkedin": "",
          "notes": "Tribal welfare digital programs, PM JANMAN scheme"
        },
        {
          "id": "ministry-of-ayush",
          "organization": "Ministry of Ayush",
          "website": "https://main.ayush.gov.in",
          "contact": "+91-11-24651933",
          "email": "secy-ayush@gov.in",
          "linkedin": "linkedin.com/company/ministry-of-ayush",
          "notes": "AI in traditional medicine, Ayush e-health auditing"
        },
        {
          "id": "ministry-of-earth-sciences-iits",
          "organization": "Ministry of Earth Sciences (IITS)",
          "website": "https://moes.gov.in",
          "contact": "+91-11-24669503",
          "email": "secy@moes.gov.in",
          "linkedin": "linkedin.com/company/ministry-of-earth-sciences",
          "notes": "Climate data AI, disaster prediction systems audit"
        },
        {
          "id": "ministry-of-health-and-family-welfare",
          "organization": "Ministry of Health and Family Welfare",
          "website": "https://mohfw.gov.in",
          "contact": "+91-11-23061863",
          "email": "secy-hfw@nic.in",
          "linkedin": "",
          "notes": "Ayushman Bharat digital health, AI diagnostics audit"
        }
      ]
    },
    {
      "id": "state-government",
      "title": "STATE GOVERNMENT",
      "count": 20,
      "organizations": [
        {
          "id": "govt-of-karnataka-dept-of-electronics-it-and-biotech",
          "organization": "Govt. of Karnataka (Dept. of Electronics, IT & Biotech)",
          "website": "https://dbt.karnataka.gov.in",
          "contact": "+91-80-22340434",
          "email": "secy@dbt.karnataka.gov.in",
          "linkedin": "linkedin.com/company/government-of-karnataka",
          "notes": "Bengaluru AI hub, Karnataka Digital Economy Mission"
        },
        {
          "id": "government-of-uttar-pradesh",
          "organization": "Government of Uttar Pradesh",
          "website": "https://up.gov.in",
          "contact": "+91-522-2239296",
          "email": "cs@up.nic.in",
          "linkedin": "linkedin.com/company/government-of-uttar-pradesh",
          "notes": "UP IT City, One District One Product digital, AI4UP"
        },
        {
          "id": "govt-of-bihar-dept-of-information-technology",
          "organization": "Govt. of Bihar (Dept. of Information Technology)",
          "website": "https://bit.bihar.gov.in",
          "contact": "+91-612-2215235",
          "email": "secy-it@bihar.gov.in",
          "linkedin": "linkedin.com/company/government-of-bihar",
          "notes": "Bihar Digital Mission, IT infrastructure expansion"
        },
        {
          "id": "govt-of-rajasthan-dept-of-it-and-communications",
          "organization": "Govt. of Rajasthan (Dept. of IT & Communications)",
          "website": "https://doitc.rajasthan.gov.in",
          "contact": "+91-141-2922345",
          "email": "secretary.doitc@rajasthan.gov.in",
          "linkedin": "linkedin.com/company/doitc",
          "notes": "RajStack, Bhamashah digital platform auditing"
        },
        {
          "id": "govt-of-odisha-ocac",
          "organization": "Govt. of Odisha (OCAC)",
          "website": "https://ocac.in",
          "contact": "+91-674-2590600",
          "email": "md@ocac.in",
          "linkedin": "linkedin.com/company/odisha-computer-application-centre",
          "notes": "5T initiative, AI for governance, e-District services"
        },
        {
          "id": "government-of-maharashtra",
          "organization": "Government of Maharashtra",
          "website": "https://maharashtra.gov.in",
          "contact": "+91-22-22025111",
          "email": "it@maharashtra.gov.in",
          "linkedin": "linkedin.com/company/government-of-maharashtra",
          "notes": "MH AI Policy, Aaple Sarkar platform, data governance"
        },
        {
          "id": "govt-of-punjab-punjab-infotech",
          "organization": "Govt. of Punjab (Punjab Infotech)",
          "website": "https://punjabinfotech.gov.in",
          "contact": "+91-172-2700344",
          "email": "md@punjabinfotech.gov.in",
          "linkedin": "linkedin.com/company/punjab-infotech",
          "notes": "eDistrict Punjab, digital health, agriculture data"
        },
        {
          "id": "government-of-tamil-nadu",
          "organization": "Government of Tamil Nadu",
          "website": "https://tn.gov.in",
          "contact": "+91-44-25670270",
          "email": "secy.itdept@tn.gov.in",
          "linkedin": "linkedin.com/company/government-of-tamil-nadu",
          "notes": "Tamil Nadu AI Policy 2023, Smart Cities, AI for governance"
        },
        {
          "id": "govt-of-kerala-state-it-mission",
          "organization": "Govt. of Kerala (State IT Mission)",
          "website": "https://itmission.kerala.gov.in",
          "contact": "+91-471-2725640",
          "email": "info@itmission.kerala.gov.in",
          "linkedin": "linkedin.com/company/kerala-state-it-mission",
          "notes": "Kerala Fiber Optic Network, K-DISC, AI for public services"
        },
        {
          "id": "govt-of-madhya-pradesh-mpsedc",
          "organization": "Govt. of Madhya Pradesh (MPSEDC)",
          "website": "https://mpsedc.mp.gov.in",
          "contact": "+91-755-4291021",
          "email": "md@mpsedc.mp.gov.in",
          "linkedin": "linkedin.com/company/mpsedc",
          "notes": "MP IT Policy, Samagra portal, digital audit requirements"
        },
        {
          "id": "govt-of-assam-dept-of-it",
          "organization": "Govt. of Assam (Dept. of IT)",
          "website": "https://assam.gov.in",
          "contact": "+91-361-2263745",
          "email": "secy-it@assam.gov.in",
          "linkedin": "linkedin.com/company/govt-assam",
          "notes": "Assam Digital Mission, Northeast digital connectivity"
        },
        {
          "id": "govt-of-andhra-pradesh-real-time-governance-ite-and-c",
          "organization": "Govt. of Andhra Pradesh (Real Time Governance - ITE&C)",
          "website": "https://itegc.ap.gov.in",
          "contact": "+91-866-2565528",
          "email": "secretary@itegc.ap.gov.in",
          "linkedin": "",
          "notes": "Fiber Grid, real-time governance data systems audit"
        },
        {
          "id": "govt-of-uttarakhand-dept-of-it",
          "organization": "Govt. of Uttarakhand (Dept. of IT)",
          "website": "https://it.uk.gov.in",
          "contact": "+91-135-2669764",
          "email": "secy.it@uk.gov.in",
          "linkedin": "linkedin.com/company/uttarakhandgov",
          "notes": "Devbhoomi Digital, Smart Char Dham, eGovernance"
        },
        {
          "id": "govt-of-goa-dept-of-it-and-electronics",
          "organization": "Govt. of Goa (Dept. of IT & Electronics)",
          "website": "https://goainfotech.gov.in",
          "contact": "+91-832-2416047",
          "email": "dit@goa.gov.in",
          "linkedin": "linkedin.com/company/government-of-goa",
          "notes": "Goa e-Gov, digital tourism, smart city auditing"
        },
        {
          "id": "govt-of-meghalaya-dept-of-it-and-communications",
          "organization": "Govt. of Meghalaya (Dept. of IT & Communications)",
          "website": "https://megit.gov.in",
          "contact": "+91-364-2500263",
          "email": "secy-it@meghalaya.gov.in",
          "linkedin": "linkedin.com/company/government-of-meghalaya",
          "notes": "MeghRaj Cloud, broadband expansion, IT audit"
        },
        {
          "id": "govt-of-manipur-dept-of-it",
          "organization": "Govt. of Manipur (Dept. of IT)",
          "website": "https://manipur.gov.in",
          "contact": "+91-385-2451396",
          "email": "dit@manipur.gov.in",
          "linkedin": "linkedin.com/company/government-of-manipur",
          "notes": "Digital Manipur, North East AI initiatives"
        },
        {
          "id": "govt-of-chhattisgarh-csidc",
          "organization": "Govt. of Chhattisgarh (CSIDC)",
          "website": "https://csidc.in",
          "contact": "+91-771-2235036",
          "email": "md@csidc.in",
          "linkedin": "linkedin.com/company/government-of-chhattisgarh",
          "notes": "Chhattisgarh IT Park, e-District, industry digital audit"
        },
        {
          "id": "govt-of-tripura-directorate-of-it",
          "organization": "Govt. of Tripura (Directorate of IT)",
          "website": "https://dit.tripura.gov.in",
          "contact": "+91-381-2325766",
          "email": "dir.it@tripura.gov.in",
          "linkedin": "linkedin.com/company/government-of-tripura",
          "notes": "Digital Tripura, fiber connectivity projects"
        },
        {
          "id": "govt-of-west-bengal-dept-of-it-and-electronics",
          "organization": "Govt. of West Bengal (Dept. of IT & Electronics)",
          "website": "https://wbitc.gov.in",
          "contact": "+91-33-22143089",
          "email": "dir-ite@wb.gov.in",
          "linkedin": "linkedin.com/company/government-of-west-bengal",
          "notes": "Silicon Valley of East, AI hub ambitions, e-Governance"
        },
        {
          "id": "gujarat-informatics-limited",
          "organization": "Gujarat Informatics Limited",
          "website": "https://gujaratinformatics.com",
          "contact": "+91-79-23256022",
          "email": "md@gil.gujarat.gov.in",
          "linkedin": "linkedin.com/company/gujarat-informatics-ltd",
          "notes": "Gujarat IT/ITeS Policy, GIFT City digital infrastructure"
        }
      ]
    },
    {
      "id": "central-agency-psu",
      "title": "CENTRAL AGENCY / PSU",
      "count": 22,
      "organizations": [
        {
          "id": "central-bureau-of-communication-mib",
          "organization": "Central Bureau of Communication (MIB)",
          "website": "https://cbcindia.gov.in",
          "contact": "+91-11-23389090",
          "email": "dg@cbc.nic.in",
          "linkedin": "linkedin.com/company/cbc-india",
          "notes": "Government media communication, AI for content"
        },
        {
          "id": "digital-india-bhashini-division",
          "organization": "Digital India Bhashini Division",
          "website": "https://bhashini.gov.in",
          "contact": "+91-11-24303714",
          "email": "contact@bhashini.gov.in",
          "linkedin": "linkedin.com/company/bhashini",
          "notes": "Language AI platform, translation services, AI data audit"
        },
        {
          "id": "coal-india-limited-cmpdi",
          "organization": "Coal India Limited (CMPDI)",
          "website": "https://coalindia.in",
          "contact": "+91-33-22826526",
          "email": "cmd@coalindia.in",
          "linkedin": "linkedin.com/company/coal-india-limited",
          "notes": "Mining AI, safety analytics, ESG digital reporting"
        },
        {
          "id": "indian-navy",
          "organization": "Indian Navy",
          "website": "https://indiannavy.nic.in",
          "contact": "+91-11-23010207",
          "email": "pronavy@navy.gov.in",
          "linkedin": "linkedin.com/company/indian-navy",
          "notes": "Defence AI, maritime surveillance, cybersecurity auditing"
        },
        {
          "id": "unique-identification-authority-of-india-uidai",
          "organization": "Unique Identification Authority of India (UIDAI)",
          "website": "https://uidai.gov.in",
          "contact": "+91-11-23466899",
          "email": "help@uidai.gov.in",
          "linkedin": "linkedin.com/company/uidai",
          "notes": "Aadhaar data governance, biometric AI audit, compliance"
        },
        {
          "id": "karmayogi-bharat-dopt",
          "organization": "Karmayogi Bharat (DoPT)",
          "website": "https://igotkarmayogi.gov.in",
          "contact": "+91-11-23093074",
          "email": "karmayogi@dopt.gov.in",
          "linkedin": "linkedin.com/company/karmayogi-bharat",
          "notes": "Civil service AI training, capacity building audit"
        },
        {
          "id": "indian-army",
          "organization": "Indian Army",
          "website": "https://indianarmy.nic.in",
          "contact": "+91-11-23016220",
          "email": "pro.army@nic.in",
          "linkedin": "linkedin.com/company/indian-army",
          "notes": "Defence AI, surveillance, autonomous systems audit"
        },
        {
          "id": "drdo",
          "organization": "DRDO",
          "website": "https://drdo.gov.in",
          "contact": "+91-11-23007028",
          "email": "ddgps@hqr.drdo.in",
          "linkedin": "linkedin.com/company/drdo-india",
          "notes": "Defence R&D AI, technology audit for sensitive projects"
        },
        {
          "id": "anusandhan-national-research-foundation-anrf",
          "organization": "Anusandhan National Research Foundation (ANRF)",
          "website": "https://anrf.gov.in",
          "contact": "+91-11-66307000",
          "email": "info@anrf.gov.in",
          "linkedin": "linkedin.com/in/anrfindia",
          "notes": "Research funding AI, grant management systems audit"
        },
        {
          "id": "centre-for-railway-information-systems-cris",
          "organization": "Centre for Railway Information Systems (CRIS)",
          "website": "https://www.cris.org.in",
          "contact": "+91-11-23342266",
          "email": "md@cris.org.in",
          "linkedin": "linkedin.com/company/centre-for-railway-information-systems",
          "notes": "Railway IT backbone, PRS/UTS systems, AI for rail"
        },
        {
          "id": "centre-for-development-of-telematics-c-dot",
          "organization": "Centre for Development of Telematics (C-DOT)",
          "website": "https://cdot.in",
          "contact": "+91-11-26974680",
          "email": "chairman@cdot.in",
          "linkedin": "linkedin.com/company/c-dot",
          "notes": "Telecom R&D, 5G/6G AI, critical infrastructure audit"
        },
        {
          "id": "alimco-artificial-limbs-manufacturing-corp",
          "organization": "ALIMCO (Artificial Limbs Manufacturing Corp.)",
          "website": "https://alimco.in",
          "contact": "+91-512-2770873",
          "email": "cmdoffice@alimco.in",
          "linkedin": "linkedin.com/company/alimco",
          "notes": "Assistive technology, AI for disability services"
        },
        {
          "id": "indian-institute-of-tropical-meteorology",
          "organization": "Indian Institute of Tropical Meteorology",
          "website": "https://tropmet.res.in",
          "contact": "+91-20-25904200",
          "email": "director@tropmet.res.in",
          "linkedin": "linkedin.com/school/iitm",
          "notes": "Climate AI, monsoon prediction, environmental data"
        },
        {
          "id": "national-health-authority",
          "organization": "National Health Authority",
          "website": "https://nha.gov.in",
          "contact": "+91-11-23753417",
          "email": "ceo@nha.gov.in",
          "linkedin": "linkedin.com/company/ayushmannha",
          "notes": "Ayushman Bharat Digital Mission, health data audit"
        },
        {
          "id": "national-payments-corporation-of-india-npci",
          "organization": "National Payments Corporation of India (NPCI)",
          "website": "https://npci.org.in",
          "contact": "+91-22-40009100",
          "email": "info@npci.org.in",
          "linkedin": "linkedin.com/company/npci",
          "notes": "UPI, RuPay AI fraud detection, payment systems audit"
        },
        {
          "id": "rec-limited-rural-electrification-corp",
          "organization": "REC Limited (Rural Electrification Corp.)",
          "website": "https://recindia.nic.in",
          "contact": "+91-11-45209100",
          "email": "recdelhi@recltd.co.in",
          "linkedin": "linkedin.com/company/rec-limited",
          "notes": "Energy sector AI, renewable project audit, ESG reporting"
        },
        {
          "id": "bharat-electronics-ltd-bel",
          "organization": "Bharat Electronics Ltd (BEL)",
          "website": "https://bel-india.in",
          "contact": "+91-80-22195131",
          "email": "cmd@bel.co.in",
          "linkedin": "linkedin.com/company/bharat-electronics-limited",
          "notes": "Defence electronics AI, smart city solutions audit"
        },
        {
          "id": "railtel-corporation-of-india-limited",
          "organization": "Railtel Corporation of India Limited",
          "website": "https://railtelindia.com",
          "contact": "+91-11-23383590",
          "email": "cmd@railtelindia.com",
          "linkedin": "linkedin.com/company/railtelindia",
          "notes": "Telecom infrastructure, OFC network, railway broadband audit"
        },
        {
          "id": "delhi-metro-corporation-dmrc",
          "organization": "Delhi Metro Corporation (DMRC)",
          "website": "https://delhimetrorail.com",
          "contact": "+91-11-23417910",
          "email": "pro@dmrc.org",
          "linkedin": "linkedin.com/company/delhi-metro-rail-corporation",
          "notes": "Smart transit AI, CCTV analytics, operations audit"
        },
        {
          "id": "biotechnology-industry-research-assistance-council-birac",
          "organization": "Biotechnology Industry Research Assistance Council (BIRAC)",
          "website": "https://birac.nic.in",
          "contact": "+91-11-39882100",
          "email": "birac@birac.nic.in",
          "linkedin": "linkedin.com/company/birac",
          "notes": "Biotech AI, startup funding audit, impact assessment"
        },
        {
          "id": "power-grid-corporation-of-india-limited",
          "organization": "Power Grid Corporation of India Limited",
          "website": "https://powergridindia.com",
          "contact": "+91-124-2571700",
          "email": "pgcil@powergridindia.com",
          "linkedin": "linkedin.com/company/power-grid-corporation-of-india",
          "notes": "Smart grid AI, energy management systems, cyber audit"
        },
        {
          "id": "dept-of-technical-education-govt-of-nct-of-delhi",
          "organization": "Dept. of Technical Education, Govt. of NCT of Delhi",
          "website": "https://dte.delhi.gov.in",
          "contact": "+91-11-23392689",
          "email": "dte@delhi.gov.in",
          "linkedin": "linkedin.com/company/government-of-delhi",
          "notes": "Skill development AI, polytechnic digital systems"
        }
      ]
    },
    {
      "id": "international-organization",
      "title": "INTERNATIONAL ORGANIZATION",
      "count": 14,
      "organizations": [
        {
          "id": "africa-ai-village-qhala-trust",
          "organization": "Africa AI Village (Qhala Trust)",
          "website": "https://qhala.com",
          "contact": "+254-20-3877000",
          "email": "info@qhala.com",
          "linkedin": "linkedin.com/company/qhala",
          "notes": "African AI ecosystem, responsible AI expansion"
        },
        {
          "id": "british-high-commission-india",
          "organization": "British High Commission India",
          "website": "https://www.gov.uk/world/india",
          "contact": "+91-11-24192100",
          "email": "bhc.newdelhi@fcdo.gov.uk",
          "linkedin": "linkedin.com/company/british-high-commission-new-delhi",
          "notes": "UK-India tech bridge, AI governance collaboration"
        },
        {
          "id": "indo-german-chamber-of-commerce-ahk",
          "organization": "INDO GERMAN CHAMBER OF COMMERCE (AHK)",
          "website": "https://indo-german.com",
          "contact": "+91-22-66657000",
          "email": "info@indo-german.com",
          "linkedin": "linkedin.com/company/indo-german-chamber-of-commerce",
          "notes": "German tech companies India entry, Industry 4.0 audit"
        },
        {
          "id": "italian-trade-agency-ita",
          "organization": "Italian Trade Agency (ITA)",
          "website": "https://www.ice.it/en",
          "contact": "+91-11-46006351",
          "email": "newdelhi@ice.it",
          "linkedin": "linkedin.com/company/italian-trade-agency",
          "notes": "Italian tech companies India, design-led tech auditing"
        },
        {
          "id": "embassy-of-switzerland-to-india-and-bhutan",
          "organization": "Embassy of Switzerland to India and Bhutan",
          "website": "https://www.eda.admin.ch/newdelhi",
          "contact": "+91-11-49959500",
          "email": "newdelhi@eda.admin.ch",
          "linkedin": "linkedin.com/company/embassy-of-switzerland-in-india-and-bhutan",
          "notes": "Swiss precision tech, fintech, life sciences AI"
        },
        {
          "id": "japan-external-trade-organization-jetro",
          "organization": "Japan External Trade Organization (JETRO)",
          "website": "https://www.jetro.go.jp/india",
          "contact": "+91-11-48566200",
          "email": "newdelhi@jetro.go.jp",
          "linkedin": "linkedin.com/company/jetro",
          "notes": "Japan-India AI corridor, robotics and automation audit"
        },
        {
          "id": "government-of-republic-of-serbia",
          "organization": "Government of Republic of Serbia",
          "website": "https://mtt.gov.rs",
          "contact": "+381-11-3617-555",
          "email": "kabinet@mtt.gov.rs",
          "linkedin": "linkedin.com/company/government-of-the-republic-of-serbia",
          "notes": "Eastern Europe AI expansion, digital services"
        },
        {
          "id": "embassy-of-the-kingdom-of-the-netherlands-in-india",
          "organization": "Embassy of the Kingdom of the Netherlands in India",
          "website": "https://www.netherlandsworldwide.nl/india",
          "contact": "+91-11-24197600",
          "email": "nde@minbuza.nl",
          "linkedin": "linkedin.com/company/netherlands-embassy-in-india",
          "notes": "Dutch AI ethics, agri-tech, water management AI"
        },
        {
          "id": "akis-tech-limited-russian-pavilion-russoft",
          "organization": "AKIS TECH. LIMITED (Russian Pavilion - Russoft)",
          "website": "https://akistech.com",
          "contact": "+7-812-430-6060",
          "email": "info@akistech.com",
          "linkedin": "linkedin.com/company/russoft",
          "notes": "Russian software companies, enterprise IT solutions"
        },
        {
          "id": "united-nations-world-food-programme-wfp",
          "organization": "United Nations World Food Programme (WFP)",
          "website": "https://www.wfp.org/india",
          "contact": "+91-11-55165600",
          "email": "wfp.india@wfp.org",
          "linkedin": "linkedin.com/company/world-food-programme",
          "notes": "Humanitarian AI, food security data systems audit"
        },
        {
          "id": "australian-consulate-general",
          "organization": "Australian Consulate - General",
          "website": "https://india.embassy.gov.au",
          "contact": "+91-44-49629000",
          "email": "chennai.congen@dfat.gov.au",
          "linkedin": "linkedin.com/company/australian-government",
          "notes": "Australia-India tech trade, AI governance framework"
        },
        {
          "id": "ai-council-ministry-of-industry-of-tajikistan",
          "organization": "AI Council, Ministry of Industry of Tajikistan",
          "website": "https://mci.tj",
          "contact": "+992-372-210210",
          "email": "info@mci.tj",
          "linkedin": "linkedin.com/company/govtj",
          "notes": "Central Asia AI development, digital economy expansion"
        },
        {
          "id": "business-france",
          "organization": "Business France",
          "website": "https://www.businessfrance.fr",
          "contact": "+91-11-23614190",
          "email": "delhi@businessfrance.fr",
          "linkedin": "linkedin.com/company/businessfrance",
          "notes": "French tech companies India, AI innovation partnerships"
        },
        {
          "id": "enterprise-estonia-eas",
          "organization": "Enterprise Estonia (EAS)",
          "website": "https://www.eas.ee/en",
          "contact": "+372-627-9700",
          "email": "eas@eas.ee",
          "linkedin": "linkedin.com/company/enterprise-estonia",
          "notes": "Estonian e-Government model, digital state export audit"
        }
      ]
    },
    {
      "id": "banking-and-financial",
      "title": "BANKING & FINANCIAL",
      "count": 3,
      "organizations": [
        {
          "id": "state-bank-of-india",
          "organization": "State Bank of India",
          "website": "https://sbi.co.in",
          "contact": "1800-11-2211 (Toll Free)",
          "email": "agmit.ho@sbi.co.in",
          "linkedin": "linkedin.com/company/state-bank-of-india",
          "notes": "India's largest bank, AI for fraud, YONO platform audit"
        },
        {
          "id": "bank-of-baroda",
          "organization": "Bank of Baroda",
          "website": "https://bankofbaroda.in",
          "contact": "1800-5700",
          "email": "crm@bankofbaroda.com",
          "linkedin": "linkedin.com/company/bank-of-baroda",
          "notes": "bob World, AI credit scoring, AML systems audit"
        },
        {
          "id": "mastercard",
          "organization": "Mastercard",
          "website": "https://mastercard.com/in",
          "contact": "+91-22-66480808",
          "email": "india@mastercard.com",
          "linkedin": "linkedin.com/company/mastercard",
          "notes": "Payment AI, cybersecurity, fraud detection audit"
        }
      ]
    },
    {
      "id": "big-tech",
      "title": "BIG TECH",
      "count": 11,
      "organizations": [
        {
          "id": "google-india",
          "organization": "Google India",
          "website": "https://google.co.in",
          "contact": "+91-80-67218000",
          "email": "press-india@google.com",
          "linkedin": "linkedin.com/company/google",
          "notes": "Google Cloud AI, BARD/Gemini India, AI4Bharat"
        },
        {
          "id": "microsoft-india",
          "organization": "Microsoft India",
          "website": "https://microsoft.com/en-in",
          "contact": "+91-80-30194000",
          "email": "indiapressoffice@microsoft.com",
          "linkedin": "linkedin.com/company/microsoft",
          "notes": "Azure AI, Copilot enterprise, AI governance frameworks"
        },
        {
          "id": "aws-amazon-india",
          "organization": "AWS/Amazon India",
          "website": "https://aws.amazon.com/in",
          "contact": "+91-80-39512345",
          "email": "aws-india@amazon.com",
          "linkedin": "linkedin.com/company/amazon-web-services",
          "notes": "Cloud AI auditing, responsible AI services, Bedrock"
        },
        {
          "id": "nvidia-india",
          "organization": "NVIDIA India",
          "website": "https://nvidia.com/en-in",
          "contact": "+91-80-41432340",
          "email": "india@nvidia.com",
          "linkedin": "linkedin.com/company/nvidia",
          "notes": "AI chips, GPU data centers, AI accelerator partnerships"
        },
        {
          "id": "meta-india",
          "organization": "Meta India",
          "website": "https://about.meta.com/in",
          "contact": "+91-22-67407500",
          "email": "india@meta.com",
          "linkedin": "linkedin.com/company/meta",
          "notes": "AI social media, WhatsApp Business AI, LLaMA"
        },
        {
          "id": "intel-india",
          "organization": "Intel India",
          "website": "https://intel.com/content/www/in/en",
          "contact": "+91-80-22178000",
          "email": "india@intel.com",
          "linkedin": "linkedin.com/company/intel-corporation",
          "notes": "Edge AI, semiconductor supply chain, AI security audit"
        },
        {
          "id": "ibm-india",
          "organization": "IBM India",
          "website": "https://ibm.com/in-en",
          "contact": "+91-80-39027200",
          "email": "ibmin@in.ibm.com",
          "linkedin": "linkedin.com/company/ibm",
          "notes": "Watson AI, AI governance, responsible AI consulting"
        },
        {
          "id": "openai",
          "organization": "OpenAI",
          "website": "https://openai.com",
          "contact": "Via website contact form",
          "email": "partnerships@openai.com",
          "linkedin": "linkedin.com/company/openai",
          "notes": "GPT enterprise, ChatGPT for Govt, AI safety audits"
        },
        {
          "id": "qualcomm-india-pvt-limited",
          "organization": "Qualcomm India Pvt. Limited",
          "website": "https://qualcomm.com/in",
          "contact": "+91-80-46288000",
          "email": "india@qualcomm.com",
          "linkedin": "linkedin.com/company/qualcomm",
          "notes": "On-device AI, 5G AI chips, Snapdragon ecosystem audit"
        },
        {
          "id": "amd-india",
          "organization": "AMD India",
          "website": "https://amd.com/en",
          "contact": "+91-80-67018000",
          "email": "india@amd.com",
          "linkedin": "linkedin.com/company/amd",
          "notes": "AI accelerators, EPYC server AI, Instinct MI series"
        },
        {
          "id": "cloudflare-india",
          "organization": "Cloudflare India",
          "website": "https://cloudflare.com",
          "contact": "+91-22-62581400",
          "email": "india@cloudflare.com",
          "linkedin": "linkedin.com/company/cloudflare",
          "notes": "AI security, Zero Trust, DDoS protection audit"
        }
      ]
    },
    {
      "id": "it-services-and-consulting",
      "title": "IT SERVICES & CONSULTING",
      "count": 11,
      "organizations": [
        {
          "id": "tata-consultancy-services-tcs",
          "organization": "Tata Consultancy Services (TCS)",
          "website": "https://tcs.com",
          "contact": "+91-22-67789595",
          "email": "corporate.communications@tcs.com",
          "linkedin": "linkedin.com/company/tata-consultancy-services",
          "notes": "AI CoE, WizAI platform, Pace Studio, large contracts"
        },
        {
          "id": "infosys",
          "organization": "Infosys",
          "website": "https://infosys.com",
          "contact": "+91-80-28520261",
          "email": "investor_relations@infosys.com",
          "linkedin": "linkedin.com/company/infosys",
          "notes": "Topaz AI, Cobalt cloud, audit and compliance practice"
        },
        {
          "id": "wipro-limited",
          "organization": "Wipro Limited",
          "website": "https://wipro.com",
          "contact": "+91-80-28440011",
          "email": "info@wipro.com",
          "linkedin": "linkedin.com/company/wipro",
          "notes": "ai360 strategy, Holmes AI, engineering services"
        },
        {
          "id": "tech-mahindra",
          "organization": "Tech Mahindra",
          "website": "https://techmahindra.com",
          "contact": "+91-20-66018100",
          "email": "global.communications@techmahindra.com",
          "linkedin": "linkedin.com/company/tech-mahindra",
          "notes": "Indus AI, telecom AI, smart manufacturing audit"
        },
        {
          "id": "hclsoftware-hcltech",
          "organization": "HCLSoftware (HCLTech)",
          "website": "https://hcltechsw.com",
          "contact": "+91-120-6125000",
          "email": "info@hcltech.com",
          "linkedin": "linkedin.com/company/hcltech",
          "notes": "DRYiCE AI, enterprise software audit, cybersecurity"
        },
        {
          "id": "cognizant-technology-solutions",
          "organization": "Cognizant Technology Solutions",
          "website": "https://cognizant.com/in/en",
          "contact": "+91-44-66419000",
          "email": "inquiry@cognizant.com",
          "linkedin": "linkedin.com/company/cognizant",
          "notes": "Neuro AI, intelligent process automation audit"
        },
        {
          "id": "accenture-india",
          "organization": "Accenture India",
          "website": "https://accenture.com/in-en",
          "contact": "+91-80-39873000",
          "email": "india.media@accenture.com",
          "linkedin": "linkedin.com/company/accenture",
          "notes": "AI and data practice, responsible AI, transformation audit"
        },
        {
          "id": "deloitte-touche-tohmatsu-india-llp",
          "organization": "Deloitte Touche Tohmatsu India LLP",
          "website": "https://deloitte.com/in/en.html",
          "contact": "+91-22-61850000",
          "email": "india@deloitte.com",
          "linkedin": "linkedin.com/company/deloitte",
          "notes": "AI risk, governance frameworks, technology audit"
        },
        {
          "id": "ernst-and-young-llp-ey",
          "organization": "Ernst & Young LLP (EY)",
          "website": "https://ey.com/en_in",
          "contact": "+91-22-61920000",
          "email": "ey.india@in.ey.com",
          "linkedin": "linkedin.com/company/ernstandyoung",
          "notes": "AI assurance, technology risk, digital transformation audit"
        },
        {
          "id": "kyndryl-solutions-pvt-ltd",
          "organization": "Kyndryl Solutions Pvt. Ltd.",
          "website": "https://kyndryl.com/in/en",
          "contact": "+91-80-66553000",
          "email": "in.media@kyndryl.com",
          "linkedin": "linkedin.com/company/kyndryl",
          "notes": "IT infrastructure services, managed services audit"
        },
        {
          "id": "thoughtworks",
          "organization": "Thoughtworks",
          "website": "https://thoughtworks.com/en-in",
          "contact": "+91-80-67350000",
          "email": "india-marketing@thoughtworks.com",
          "linkedin": "linkedin.com/company/thoughtworks",
          "notes": "Responsible AI, engineering excellence, XAI audits"
        }
      ]
    },
    {
      "id": "hardware-and-infrastructure",
      "title": "HARDWARE & INFRASTRUCTURE",
      "count": 13,
      "organizations": [
        {
          "id": "airtel",
          "organization": "Airtel",
          "website": "https://airtel.in",
          "contact": "+91-124-4222222",
          "email": "airtel.presence@airtel.com",
          "linkedin": "linkedin.com/company/bharti-airtel",
          "notes": "5G AI, enterprise connectivity, IZO Cloud audit"
        },
        {
          "id": "dell-technologies-india",
          "organization": "Dell Technologies India",
          "website": "https://dell.com/en-in",
          "contact": "+91-80-25021234",
          "email": "dell.india@dell.com",
          "linkedin": "linkedin.com/company/dell-technologies",
          "notes": "Edge AI, data center infrastructure, AI PC audit"
        },
        {
          "id": "hp-india-sales-pvt-ltd",
          "organization": "HP India Sales Pvt. Ltd.",
          "website": "https://hp.com/in-en/home.html",
          "contact": "+91-80-28520000",
          "email": "india.press@hp.com",
          "linkedin": "linkedin.com/company/hp",
          "notes": "AI workstations, print AI, enterprise solutions audit"
        },
        {
          "id": "schneider-electric-india",
          "organization": "Schneider Electric India",
          "website": "https://se.com/in/en",
          "contact": "+91-20-27042000",
          "email": "india@schneider-electric.com",
          "linkedin": "linkedin.com/company/schneider-electric",
          "notes": "Energy AI, data center efficiency, EcoStruxure audit"
        },
        {
          "id": "vertiv-india",
          "organization": "Vertiv India",
          "website": "https://vertiv.com/en-in",
          "contact": "+91-80-42546000",
          "email": "india@vertiv.com",
          "linkedin": "linkedin.com/company/vertiv",
          "notes": "Data center AI cooling, UPS systems, critical infra audit"
        },
        {
          "id": "lenovo-india",
          "organization": "Lenovo India",
          "website": "https://lenovo.com/in/en",
          "contact": "+91-80-40194000",
          "email": "india@lenovo.com",
          "linkedin": "linkedin.com/company/lenovo",
          "notes": "AI PCs, ThinkAI solutions, edge computing audit"
        },
        {
          "id": "asus-india",
          "organization": "ASUS India",
          "website": "https://asus.com/in",
          "contact": "+91-180-0102-5555",
          "email": "india@asus.com",
          "linkedin": "linkedin.com/company/asus",
          "notes": "AI-enabled hardware, AI workstations, smart devices"
        },
        {
          "id": "supermicro-computer-inc",
          "organization": "Supermicro Computer Inc.",
          "website": "https://supermicro.com",
          "contact": "+1-408-503-8000",
          "email": "marketing@supermicro.com",
          "linkedin": "linkedin.com/company/super-micro-computer",
          "notes": "AI server infrastructure, GPU clusters, data centers"
        },
        {
          "id": "netweb-technologies-india-ltd",
          "organization": "Netweb Technologies India Ltd.",
          "website": "https://netweb.in",
          "contact": "+91-120-4830000",
          "email": "info@netweb.in",
          "linkedin": "linkedin.com/company/netweb-technologies-india-ltd",
          "notes": "AI server manufacturing India, HPC solutions audit"
        },
        {
          "id": "hpe-hewlett-packard-enterprise",
          "organization": "HPE (Hewlett Packard Enterprise)",
          "website": "https://hpe.com/in/en",
          "contact": "+91-80-41026000",
          "email": "india@hpe.com",
          "linkedin": "linkedin.com/company/hewlett-packard-enterprise",
          "notes": "GreenLake AI, edge computing, data fabric audit"
        },
        {
          "id": "arista-networks",
          "organization": "Arista Networks",
          "website": "https://arista.com",
          "contact": "+91-80-43512345",
          "email": "india@arista.com",
          "linkedin": "linkedin.com/company/arista-networks",
          "notes": "AI networking, data center switches, CloudVision audit"
        },
        {
          "id": "redington-limited",
          "organization": "Redington Limited",
          "website": "https://redingtongroup.com",
          "contact": "+91-44-42243353",
          "email": "corporate@redingtongroup.com",
          "linkedin": "linkedin.com/company/redingtonlimited",
          "notes": "IT distribution, AI product supply chain audit"
        },
        {
          "id": "vvdn-technologies",
          "organization": "VVDN Technologies",
          "website": "https://vvdntech.in",
          "contact": "+91-124-4797898",
          "email": "info@vvdntech.com",
          "linkedin": "linkedin.com/company/vvdn-technologies",
          "notes": "AI hardware design, edge AI devices, R&D services"
        }
      ]
    },
    {
      "id": "cloud-and-data",
      "title": "CLOUD & DATA",
      "count": 8,
      "organizations": [
        {
          "id": "yotta-data-services",
          "organization": "Yotta Data Services",
          "website": "https://yotta.com",
          "contact": "+91-22-67454000",
          "email": "info@yotta.com",
          "linkedin": "linkedin.com/company/yotta-infrastructure",
          "notes": "Hyperscale data centers, cloud AI, colocation audit"
        },
        {
          "id": "adaniconnex-coredge",
          "organization": "AdaniConnex (CoRedge)",
          "website": "https://adaniconnex.com",
          "contact": "+91-79-26565555",
          "email": "connect@adaniconnex.com",
          "linkedin": "linkedin.com/company/adani-connex",
          "notes": "Data center development, colocation, green AI infra"
        },
        {
          "id": "anant-raj-cloud-pvt-ltd",
          "organization": "Anant Raj Cloud Pvt. Ltd.",
          "website": "https://anantrajcloud.com",
          "contact": "+91-11-26853060",
          "email": "info@anantrajcloud.com",
          "linkedin": "linkedin.com/company/anant-raj-limited",
          "notes": "India cloud infrastructure, AI workload hosting audit"
        },
        {
          "id": "neevcloud",
          "organization": "NeevCloud",
          "website": "https://neevcloud.com",
          "contact": "+91-79-40045000",
          "email": "info@neevcloud.com",
          "linkedin": "linkedin.com/company/neevcloud-india",
          "notes": "GPU cloud, AI training infrastructure, startup ecosystem"
        },
        {
          "id": "neysa-networks-pvt-ltd",
          "organization": "Neysa Networks Pvt. Ltd.",
          "website": "https://neysa.net",
          "contact": "+91-40-67198000",
          "email": "info@neysa.net",
          "linkedin": "linkedin.com/company/neysaai",
          "notes": "AI cloud compute, GPU-as-a-service, model training"
        },
        {
          "id": "esds-software-solution-limited",
          "organization": "ESDS Software Solution Limited",
          "website": "https://esds.co.in",
          "contact": "+91-253-6630555",
          "email": "info@esds.co.in",
          "linkedin": "linkedin.com/company/esdsdc",
          "notes": "Cloud hosting, managed services, compliance audit"
        },
        {
          "id": "sify-technologies",
          "organization": "SIFY Technologies",
          "website": "https://sifytechnologies.com",
          "contact": "+91-44-22540770",
          "email": "sifycare@sifycorp.com",
          "linkedin": "linkedin.com/company/sify-technologies",
          "notes": "Network cloud, data center services, AI infra audit"
        },
        {
          "id": "ddn-datadirect-networks",
          "organization": "DDN (DataDirect Networks)",
          "website": "https://ddn.com",
          "contact": "+1-818-700-7600",
          "email": "sales@ddn.com",
          "linkedin": "linkedin.com/company/datadirect-networks",
          "notes": "AI storage, HPC data management, research infra audit"
        }
      ]
    },
    {
      "id": "software-and-enterprise",
      "title": "SOFTWARE & ENTERPRISE",
      "count": 13,
      "organizations": [
        {
          "id": "servicenow-india",
          "organization": "ServiceNow India",
          "website": "https://servicenow.com/in",
          "contact": "+91-80-67415000",
          "email": "india@servicenow.com",
          "linkedin": "linkedin.com/company/servicenow",
          "notes": "Now Platform AI, ITSM automation, enterprise audit"
        },
        {
          "id": "salesforce-india",
          "organization": "Salesforce India",
          "website": "https://salesforce.com/in",
          "contact": "+91-22-61200000",
          "email": "india@salesforce.com",
          "linkedin": "linkedin.com/company/salesforce",
          "notes": "Einstein AI, CRM automation, data governance audit"
        },
        {
          "id": "zoho-corporation",
          "organization": "Zoho Corporation",
          "website": "https://zoho.com",
          "contact": "+91-44-66443000",
          "email": "info@zoho.com",
          "linkedin": "linkedin.com/company/zoho",
          "notes": "Zia AI, enterprise suite, data residency, privacy audit"
        },
        {
          "id": "adobe-india",
          "organization": "Adobe India",
          "website": "https://adobe.com/in",
          "contact": "+91-80-45217000",
          "email": "india@adobe.com",
          "linkedin": "linkedin.com/company/adobe",
          "notes": "Firefly generative AI, content supply chain audit"
        },
        {
          "id": "fortinet-india",
          "organization": "Fortinet India",
          "website": "https://fortinet.com/in",
          "contact": "+91-22-66107660",
          "email": "india@fortinet.com",
          "linkedin": "linkedin.com/company/fortinet",
          "notes": "AI-driven security, FortiAI, cybersecurity audit"
        },
        {
          "id": "razorpay",
          "organization": "Razorpay",
          "website": "https://razorpay.com",
          "contact": "+91-80-68008000",
          "email": "support@razorpay.com",
          "linkedin": "linkedin.com/company/razorpay",
          "notes": "Payment AI, fraud detection, fintech compliance audit"
        },
        {
          "id": "red-hat-india-pvt-ltd",
          "organization": "Red Hat India Pvt. Ltd.",
          "website": "https://redhat.com/en",
          "contact": "+91-80-43401200",
          "email": "india@redhat.com",
          "linkedin": "linkedin.com/company/red-hat",
          "notes": "Open hybrid cloud AI, Ansible automation audit"
        },
        {
          "id": "cisco-commerce-cisco-systems-india",
          "organization": "Cisco Commerce/Cisco Systems India",
          "website": "https://cisco.com/c/en_in",
          "contact": "+91-80-22853000",
          "email": "india@cisco.com",
          "linkedin": "linkedin.com/company/cisco",
          "notes": "AI networking, Webex AI, security fabric audit"
        },
        {
          "id": "linkedin-india",
          "organization": "LinkedIn India",
          "website": "https://business.linkedin.com/en-in",
          "contact": "+91-22-66226000",
          "email": "india@linkedin.com",
          "linkedin": "linkedin.com/company/linkedin",
          "notes": "Professional AI, hiring automation, talent audit"
        },
        {
          "id": "github-microsoft",
          "organization": "GitHub (Microsoft)",
          "website": "https://github.com",
          "contact": "Via support portal",
          "email": "enterprise@github.com",
          "linkedin": "linkedin.com/company/github",
          "notes": "Copilot AI, developer productivity, code audit"
        },
        {
          "id": "intellect-design-arena",
          "organization": "Intellect Design Arena",
          "website": "https://intellectdesign.com",
          "contact": "+91-44-39913000",
          "email": "info@intellectdesign.com",
          "linkedin": "linkedin.com/company/intellect_design_arena",
          "notes": "Financial AI, FinTech iGTB, banking technology audit"
        },
        {
          "id": "eset-india",
          "organization": "ESET India",
          "website": "https://eset.com/in",
          "contact": "+91-20-67291200",
          "email": "india@eset.com",
          "linkedin": "linkedin.com/company/eset",
          "notes": "AI cybersecurity, endpoint protection, threat audit"
        },
        {
          "id": "extramarks-education-india-pvt-ltd",
          "organization": "Extramarks Education India Pvt. Ltd.",
          "website": "https://extramarks.com",
          "contact": "+91-120-6555000",
          "email": "info@extramarks.com",
          "linkedin": "linkedin.com/company/extramarks",
          "notes": "EdTech AI, adaptive learning, educational data audit"
        }
      ]
    },
    {
      "id": "indian-ai-and-tech",
      "title": "INDIAN AI & TECH",
      "count": 21,
      "organizations": [
        {
          "id": "sarvam-ai",
          "organization": "Sarvam AI",
          "website": "https://sarvam.ai",
          "contact": "Via website",
          "email": "contact@sarvam.ai",
          "linkedin": "linkedin.com/company/sarvam-ai",
          "notes": "Indian LLM, Indic language AI, responsible AI audit"
        },
        {
          "id": "gnani-ai",
          "organization": "Gnani.ai",
          "website": "https://gnani.ai",
          "contact": "+91-80-45682000",
          "email": "info@gnani.ai",
          "linkedin": "linkedin.com/company/gnani-ai",
          "notes": "Conversational AI, voice bots, NLP audit for enterprises"
        },
        {
          "id": "corover-private-limited-bharatgpt",
          "organization": "CoRover Private Limited (BharatGPT)",
          "website": "https://corover.ai",
          "contact": "+91-20-49000000",
          "email": "info@corover.ai",
          "linkedin": "linkedin.com/company/corover",
          "notes": "IRCTC AskDisha, BharatGPT, govt chatbot audit"
        },
        {
          "id": "wadhwani-ai",
          "organization": "Wadhwani AI",
          "website": "https://wadhwaniai.org",
          "contact": "+91-22-26534800",
          "email": "info@wadhwaniai.org",
          "linkedin": "linkedin.com/company/wadhwani-ai",
          "notes": "Social impact AI, agriculture AI, responsible AI audit"
        },
        {
          "id": "prisma-ai",
          "organization": "Prisma AI",
          "website": "https://prisma-ai.com",
          "contact": "Via website",
          "email": "contact@prisma-ai.com",
          "linkedin": "linkedin.com/company/prisma-ro",
          "notes": "Vision AI, content moderation, AI product audit"
        },
        {
          "id": "turiya-semiconductors-pvt-ltd",
          "organization": "Turiya Semiconductors Pvt. Ltd.",
          "website": "https://turiyam.ai",
          "contact": "Via website",
          "email": "info@turiyam.ai",
          "linkedin": "linkedin.com/company/turiyam-ai",
          "notes": "AI chip design, semiconductor AI, hardware audit"
        },
        {
          "id": "simplismart",
          "organization": "Simplismart",
          "website": "https://simplismart.ai",
          "contact": "Via website",
          "email": "hello@simplismart.ai",
          "linkedin": "linkedin.com/company/simplismart",
          "notes": "MLOps, AI deployment optimization, model audit"
        },
        {
          "id": "lexlegis-ai",
          "organization": "Lexlegis.ai",
          "website": "https://lexlegis.ai",
          "contact": "Via website",
          "email": "contact@lexlegis.ai",
          "linkedin": "linkedin.com/company/lexlegis-ai",
          "notes": "LegalTech AI, contract analysis, AI governance audit"
        },
        {
          "id": "plivo",
          "organization": "Plivo",
          "website": "https://plivo.com",
          "contact": "+1-855-746-8600",
          "email": "sales@plivo.com",
          "linkedin": "linkedin.com/company/plivo",
          "notes": "Communication AI, CPaaS, enterprise messaging audit"
        },
        {
          "id": "jio-intelligence",
          "organization": "Jio Intelligence",
          "website": "https://jio.com",
          "contact": "+91-22-44772000",
          "email": "jiobusiness@ril.com",
          "linkedin": "linkedin.com/company/reliance-jio",
          "notes": "Telecom AI, 5G services, enterprise JioCloud audit"
        },
        {
          "id": "bluemachines-apna-com",
          "organization": "Bluemachines (Apna.com)",
          "website": "https://apna.co",
          "contact": "+91-80-67286000",
          "email": "hello@apna.co",
          "linkedin": "linkedin.com/company/apna-com",
          "notes": "Job platform AI, blue-collar workforce, HR tech audit"
        },
        {
          "id": "larsen-and-toubro-vyoma",
          "organization": "Larsen & Toubro Vyoma",
          "website": "https://ltvyoma.com",
          "contact": "+91-22-67525656",
          "email": "info@ltvyoma.com",
          "linkedin": "linkedin.com/company/larsentoubrovyoma",
          "notes": "Space tech AI, satellite communication, defence"
        },
        {
          "id": "iconova-creative-outreach-network-pvt-ltd",
          "organization": "Iconova Creative Outreach Network Pvt. Ltd.",
          "website": "https://iconova.ai",
          "contact": "Via website",
          "email": "contact@iconova.ai",
          "linkedin": "linkedin.com/company/iconova",
          "notes": "AI creative solutions, content generation, brand audit"
        },
        {
          "id": "tcg-digital-solutions-pvt-ltd",
          "organization": "TCG Digital Solutions Pvt. Ltd.",
          "website": "https://tcgdigital.com",
          "contact": "+91-33-44165555",
          "email": "info@tcgdigital.com",
          "linkedin": "linkedin.com/company/tcg-digital",
          "notes": "Industrial AI, process automation, manufacturing audit"
        },
        {
          "id": "velankani-information-systems-ltd",
          "organization": "Velankani Information Systems Ltd.",
          "website": "https://velankani.net",
          "contact": "+91-80-25208800",
          "email": "info@velankani.net",
          "linkedin": "linkedin.com/company/velankani-information-systems",
          "notes": "Networking AI, defense tech, communication audit"
        },
        {
          "id": "meganet-technologies-global-limited",
          "organization": "Meganet Technologies Global Limited",
          "website": "https://meganettech.com",
          "contact": "Via website",
          "email": "info@meganettech.com",
          "linkedin": "linkedin.com/company/meganet",
          "notes": "Global connectivity AI, network services audit"
        },
        {
          "id": "eros-innovation",
          "organization": "Eros Innovation",
          "website": "https://erosinnovation.com",
          "contact": "Via website",
          "email": "info@erosinnovation.com",
          "linkedin": "linkedin.com/company/erosinnovation",
          "notes": "Entertainment AI, OTT analytics, content audit"
        },
        {
          "id": "exotel",
          "organization": "Exotel",
          "website": "https://exotel.com",
          "contact": "+91-80-49403000",
          "email": "sales@exotel.com",
          "linkedin": "linkedin.com/company/exotel",
          "notes": "Cloud telephony AI, customer engagement, voice audit"
        },
        {
          "id": "ansys-software-pvt-ltd",
          "organization": "Ansys Software Pvt Ltd",
          "website": "https://ansys.com/en-in",
          "contact": "+91-80-67352000",
          "email": "india@ansys.com",
          "linkedin": "linkedin.com/company/ansys",
          "notes": "Simulation AI, digital twins, engineering audit"
        },
        {
          "id": "blockchain-for-impact-bfi",
          "organization": "Blockchain For Impact (BFI)",
          "website": "https://blockchainforimpact.org",
          "contact": "Via website",
          "email": "info@blockchainforimpact.org",
          "linkedin": "linkedin.com/company/blockchain-for-impact-bfi",
          "notes": "Social impact blockchain, transparency audit, ESG"
        },
        {
          "id": "csr-box",
          "organization": "CSR BOX",
          "website": "https://csrbox.org",
          "contact": "+91-11-41034002",
          "email": "info@csrbox.org",
          "linkedin": "linkedin.com/company/csrbox",
          "notes": "CSR AI platform, impact measurement, compliance audit"
        }
      ]
    },
    {
      "id": "other",
      "title": "OTHER",
      "count": 7,
      "organizations": [
        {
          "id": "gates-foundation-india",
          "organization": "Gates Foundation (India)",
          "website": "https://gatesfoundation.org",
          "contact": "+1-206-709-3100",
          "email": "info@gatesfoundation.org",
          "linkedin": "linkedin.com/company/bill-and-melinda-gates-foundation",
          "notes": "Health & education AI for development, impact audit"
        },
        {
          "id": "esc-electronic-software-export-promotion-council",
          "organization": "ESC (Electronic Software Export Promotion Council)",
          "website": "https://escindia.in",
          "contact": "+91-11-26867205",
          "email": "info@escindia.in",
          "linkedin": "linkedin.com/company/esc-india",
          "notes": "IT export promotion, industry standards, digital audit"
        },
        {
          "id": "the-lego-group-india",
          "organization": "The LEGO Group (India)",
          "website": "https://lego.com/en-in",
          "contact": "+91-22-66110000",
          "email": "india@lego.com",
          "linkedin": "linkedin.com/company/the-lego-group",
          "notes": "AI education, STEM learning tech, creative AI audit"
        },
        {
          "id": "technology-services-industry-association-tsia",
          "organization": "Technology Services Industry Association (TSIA)",
          "website": "https://tsia.com",
          "contact": "+1-858-674-5491",
          "email": "info@tsia.com",
          "linkedin": "linkedin.com/company/technology-services-industry-association-tsia",
          "notes": "Tech services benchmarking, AI services audit standards"
        },
        {
          "id": "centre-for-open-societal-systems-coss-ekstep-foundation",
          "organization": "Centre for Open Societal Systems (COSS/EkStep Foundation)",
          "website": "https://ekstep.org",
          "contact": "+91-80-66990066",
          "email": "info@ekstep.org",
          "linkedin": "linkedin.com/company/ekstep-foundation",
          "notes": "Open digital public goods, DIKSHA, AI for education"
        },
        {
          "id": "the-international-solar-alliance-isa",
          "organization": "The International Solar Alliance (ISA)",
          "website": "https://isolaralliance.org",
          "contact": "+91-124-4559399",
          "email": "info@isolaralliance.org",
          "linkedin": "linkedin.com/company/internationalsolaralliance",
          "notes": "Solar AI, clean energy tech, sustainability audit"
        },
        {
          "id": "mastercard-india",
          "organization": "Mastercard (India)",
          "website": "https://mastercard.in",
          "contact": "+91-22-66480808",
          "email": "india@mastercard.com",
          "linkedin": "linkedin.com/company/mastercard",
          "notes": "Payments AI, financial inclusion, cybersecurity audit"
        }
      ]
    }
  ]
} satisfies {
  title: string
  totalOrganizations: number
  sectionCount: number
  sections: IndiaAiSection[]
}
