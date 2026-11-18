import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.DB_URI || "mongodb://localhost:27017";
const dbName = process.env.DB_NAME || "equiploop";

export const SAMPLE_EQUIPMENT = [
  {
    title: "Caterpillar 305.5E2 Mini Hydraulic Excavator",
    category: "Heavy Machinery",
    description: "Compact and powerful hydraulic mini excavator engineered for high productivity, tight radius earthmoving, trenching, and utility works. Features an enclosed pressurized cab with AC, hydraulic thumb, and quick-attach coupler.",
    images: [
      "https://images.unsplash.com/photo-1579847188804-ecba0e2ea330?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80"
    ],
    pricePerDay: 350,
    securityDeposit: 500,
    specifications: {
      Brand: "Caterpillar",
      Model: "305.5E2 CR",
      "Operating Weight": "5,400 kg (11,905 lbs)",
      "Net Power": "44.1 kW (59 hp)",
      "Max Dig Depth": "3.83 m (12.5 ft)",
      "Fuel Type": "Diesel"
    },
    condition: "Excellent",
    location: {
      city: "Austin",
      state: "TX",
      address: "8400 Industrial Blvd"
    },
    availability: true,
    ownerId: "owner_seed_1",
    ownerName: "Apex Heavy Fleet LLC",
    ownerEmail: "rentals@apexmachinery.com",
    status: "Approved",
    isFeatured: true,
    rating: 4.9,
    totalReviews: 14,
    totalBookings: 28,
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "Bobcat S650 Skid-Steer Loader",
    category: "Heavy Machinery",
    description: "High-lift vertical path loader designed for heavy lifting, grading, site clearance, and agricultural duty. Compatible with standard attachments and auxiliary high-flow hydraulics.",
    images: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
    ],
    pricePerDay: 280,
    securityDeposit: 400,
    specifications: {
      Brand: "Bobcat",
      Model: "S650 Tier 4",
      "Operating Capacity": "1,220 kg (2,690 lbs)",
      "Horsepower": "74 hp Turbo Diesel",
      "Travel Speed": "11.8 km/h"
    },
    condition: "Excellent",
    location: {
      city: "Houston",
      state: "TX",
      address: "1240 Port Commerce Way"
    },
    availability: true,
    ownerId: "owner_seed_1",
    ownerName: "Apex Heavy Fleet LLC",
    ownerEmail: "rentals@apexmachinery.com",
    status: "Approved",
    isFeatured: true,
    rating: 4.8,
    totalReviews: 9,
    totalBookings: 19,
    createdAt: new Date(Date.now() - 25 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "Genie GS-1930 Electric Scissor Lift",
    category: "Material Handling",
    description: "Quiet, zero-emission electric scissor lift capable of passing through standard single doorways. Ideal for indoor warehouse maintenance, electrical retrofits, ceiling ductwork, and staging.",
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"
    ],
    pricePerDay: 145,
    securityDeposit: 250,
    specifications: {
      Brand: "Genie",
      Model: "GS-1930",
      "Working Height": "7.79 m (25 ft)",
      "Platform Capacity": "227 kg (500 lbs)",
      "Machine Width": "0.76 m (30 in)",
      "Power Source": "24V DC Battery System"
    },
    condition: "Excellent",
    location: {
      city: "Dallas",
      state: "TX",
      address: "450 Logistics Pkwy"
    },
    availability: true,
    ownerId: "owner_seed_2",
    ownerName: "Northstar Plant Rentals",
    ownerEmail: "dispatch@northstarrentals.com",
    status: "Approved",
    isFeatured: true,
    rating: 5.0,
    totalReviews: 8,
    totalBookings: 22,
    createdAt: new Date(Date.now() - 20 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "Wacker Neuson WP1550AW Vibratory Plate Compactor",
    category: "Construction",
    description: "Commercial-grade single direction asphalt and soil compactor equipped with Honda engine and integrated water tank for dust suppression and asphalt compaction without adhesion.",
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
    ],
    pricePerDay: 85,
    securityDeposit: 150,
    specifications: {
      Brand: "Wacker Neuson",
      Model: "WP 1550AW",
      "Centrifugal Force": "15 kN (3,375 lbf)",
      "Plate Width": "500 mm (19.7 in)",
      "Engine": "Honda GX160 4.8 hp"
    },
    condition: "Good",
    location: {
      city: "Austin",
      state: "TX",
      address: "3100 East 7th St"
    },
    availability: true,
    ownerId: "owner_seed_2",
    ownerName: "Northstar Plant Rentals",
    ownerEmail: "dispatch@northstarrentals.com",
    status: "Approved",
    isFeatured: false,
    rating: 4.7,
    totalReviews: 6,
    totalBookings: 15,
    createdAt: new Date(Date.now() - 18 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "DeWalt DWS780 12-Inch Sliding Compound Miter Saw",
    category: "Power Tools",
    description: "Ultra-precise 15-Amp sliding dual-bevel compound miter saw with XPS cross-cut positioning system for shadow cut lines. Delivers clean bevel cuts in architectural trim and dimensioned timber.",
    images: [
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=80"
    ],
    pricePerDay: 45,
    securityDeposit: 100,
    specifications: {
      Brand: "DeWalt",
      Model: "DWS780",
      "Blade Diameter": "12 in (305 mm)",
      "Motor": "15 Amp 3,800 RPM",
      "Cross-Cut Capacity": "2x16 at 90 degrees",
      "Weight": "56 lbs"
    },
    condition: "Excellent",
    location: {
      city: "San Antonio",
      state: "TX",
      address: "1902 Timberland Rd"
    },
    availability: true,
    ownerId: "owner_seed_2",
    ownerName: "Northstar Plant Rentals",
    ownerEmail: "dispatch@northstarrentals.com",
    status: "Approved",
    isFeatured: false,
    rating: 4.9,
    totalReviews: 12,
    totalBookings: 35,
    createdAt: new Date(Date.now() - 15 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "Bosch GBH 12-52 DV 1-9/16\" SDS-Max Rotary Hammer",
    category: "Power Tools",
    description: "Heavy demolition rotary hammer with 19 Joules of impact energy and triple vibration control. Built for high-speed continuous drilling in reinforced concrete and brick masonry.",
    images: [
      "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1200&q=80"
    ],
    pricePerDay: 60,
    securityDeposit: 120,
    specifications: {
      Brand: "Bosch Professional",
      Model: "GBH 12-52 DV",
      "Impact Energy": "19 J",
      "Chuck Type": "SDS-max",
      "Drilling Dia. Concrete": "12 - 52 mm",
      "Rated Input": "1700 W"
    },
    condition: "Brand New",
    location: {
      city: "Austin",
      state: "TX",
      address: "8400 Industrial Blvd"
    },
    availability: true,
    ownerId: "owner_seed_1",
    ownerName: "Apex Heavy Fleet LLC",
    ownerEmail: "rentals@apexmachinery.com",
    status: "Approved",
    isFeatured: false,
    rating: 5.0,
    totalReviews: 5,
    totalBookings: 11,
    createdAt: new Date(Date.now() - 12 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "Vermeer SC30TX Commercial Tracked Stump Cutter",
    category: "Landscaping & Gardening",
    description: "Rubber-tracked self-propelled stump grinder designed to access backyard gates down to 35 inches while exerting minimal ground pressure. Powered by a 25 hp Kohler EFI petrol engine.",
    images: [
      "https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=1200&q=80"
    ],
    pricePerDay: 230,
    securityDeposit: 350,
    specifications: {
      Brand: "Vermeer",
      Model: "SC30TX",
      "Engine": "Kohler Command PRO EFI 25 hp",
      "Cutter Wheel Diameter": "16 in (40.6 cm)",
      "Cutting Height Above Ground": "25 in (63.5 cm)",
      "Cutting Depth Below Ground": "12 in (30.5 cm)"
    },
    condition: "Excellent",
    location: {
      city: "Fort Worth",
      state: "TX",
      address: "710 Arbor Way"
    },
    availability: true,
    ownerId: "owner_seed_1",
    ownerName: "Apex Heavy Fleet LLC",
    ownerEmail: "rentals@apexmachinery.com",
    status: "Approved",
    isFeatured: true,
    rating: 4.8,
    totalReviews: 7,
    totalBookings: 16,
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "JBL PRX ONE All-in-One Powered Column PA System",
    category: "Audio/Visual & Event Tech",
    description: "Acoustically optimized 2,000-watt column array system with built-in 7-channel digital mixer, Lexicon DSP effects, Bluetooth audio streaming, and mobile app control. Great for weddings, corporate summits, and concerts.",
    images: [
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80"
    ],
    pricePerDay: 130,
    securityDeposit: 200,
    specifications: {
      Brand: "JBL Professional",
      Model: "PRX ONE",
      "Peak Output": "2,000 Watts",
      "Max SPL": "130 dB",
      "Woofers": "12\" custom bass-reflex subwoofer",
      "Inputs": "4 XLR combo, 2 1/4\" Hi-Z, 1 3.5mm AUX"
    },
    condition: "Excellent",
    location: {
      city: "Austin",
      state: "TX",
      address: "602 Red River St"
    },
    availability: true,
    ownerId: "owner_seed_2",
    ownerName: "Northstar Plant Rentals",
    ownerEmail: "dispatch@northstarrentals.com",
    status: "Approved",
    isFeatured: true,
    rating: 4.9,
    totalReviews: 11,
    totalBookings: 24,
    createdAt: new Date(Date.now() - 8 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "Honda EU7000iS Inverter Generator 7000W Fuel Injected",
    category: "Generators & Power",
    description: "Super quiet fuel-injected portable inverter generator providing clean, stable power for sensitive electronic equipment, film sets, food trucks, and job site trailers. Electric push-button start.",
    images: [
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80"
    ],
    pricePerDay: 95,
    securityDeposit: 150,
    specifications: {
      Brand: "Honda Power Equipment",
      Model: "EU7000iS",
      "Max Output": "7,000 Watts (120/240V)",
      "Rated Output": "5,500 Watts",
      "Noise Level": "52 to 58 dBA",
      "Run Time per Tank": "6.5 to 18.0 hours"
    },
    condition: "Excellent",
    location: {
      city: "Dallas",
      state: "TX",
      address: "450 Logistics Pkwy"
    },
    availability: true,
    ownerId: "owner_seed_2",
    ownerName: "Northstar Plant Rentals",
    ownerEmail: "dispatch@northstarrentals.com",
    status: "Approved",
    isFeatured: true,
    rating: 5.0,
    totalReviews: 15,
    totalBookings: 32,
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "Kärcher HD 4.0/40 G Industrial Gas Pressure Washer",
    category: "Cleaning & Restoration",
    description: "Heavy-duty cold water pressure washer delivering 4,000 PSI at 4.0 GPM with Honda GX390 commercial engine. Features corrosion-resistant aluminum frame and flat-free tires for site cleanup and paint preparation.",
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80"
    ],
    pricePerDay: 75,
    securityDeposit: 120,
    specifications: {
      Brand: "Kärcher",
      Model: "HD 4.0/40 G",
      "Operating Pressure": "4,000 PSI",
      "Water Flow Rate": "4.0 GPM",
      "Engine": "Honda GX390",
      "Hose Length": "50 ft Steel Wire Braided"
    },
    condition: "Good",
    location: {
      city: "Houston",
      state: "TX",
      address: "1240 Port Commerce Way"
    },
    availability: true,
    ownerId: "owner_seed_1",
    ownerName: "Apex Heavy Fleet LLC",
    ownerEmail: "rentals@apexmachinery.com",
    status: "Approved",
    isFeatured: false,
    rating: 4.6,
    totalReviews: 4,
    totalBookings: 10,
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function seedDatabase() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const equipmentCol = db.collection("equipment");

    const count = await equipmentCol.countDocuments();
    if (count === 0) {
      await equipmentCol.insertMany(SAMPLE_EQUIPMENT);
      console.log(`[Seed] Seeded ${SAMPLE_EQUIPMENT.length} equipment items.`);
    } else {
      console.log(`[Seed] Database already contains ${count} equipment items. Skipping seed.`);
    }
  } catch (err) {
    console.error("[Seed Error]", err);
  } finally {
    await client.close();
  }
}

if (process.argv[1]?.endsWith("seedData.js")) {
  seedDatabase().then(() => process.exit(0));
}
