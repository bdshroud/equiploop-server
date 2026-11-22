import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.DB_URI || "mongodb://localhost:27017";
const dbName = process.env.DB_NAME || "equiploop";

export const SAMPLE_EQUIPMENT = [
  {
    title: "Caterpillar 305.5E2 Mini Hydraulic Excavator",
    equipmentName: "Caterpillar 305.5E2 Mini Hydraulic Excavator",
    category: "Construction Equipment",
    rentalType: "Daily",
    rentalPrice: 350,
    pricePerDay: 350,
    availableQuantity: 3,
    securityDeposit: 500,
    condition: "Excellent",
    brand: "Caterpillar",
    model: "305.5E2 CR",
    rentalTerms: "Refundable damage deposit required. Certified operator only. Return with full diesel tank.",
    description: "Compact and powerful hydraulic mini excavator engineered for high productivity, tight radius earthmoving, trenching, and utility works. Features an enclosed pressurized cab with AC, hydraulic thumb, and quick-attach coupler.",
    images: [
      "https://images.unsplash.com/photo-1579847188804-ecba0e2ea330?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "Caterpillar",
      Model: "305.5E2 CR",
      "Operating Weight": "5,400 kg (11,905 lbs)",
      "Net Power": "44.1 kW (59 hp)",
      "Max Dig Depth": "3.83 m (12.5 ft)",
      "Fuel Type": "Diesel"
    },
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
    title: "Sony FX6 Full-Frame Cinema Camera Kit with G-Master Lenses",
    equipmentName: "Sony FX6 Full-Frame Cinema Camera Kit with G-Master Lenses",
    category: "Photography Equipment",
    rentalType: "Daily",
    rentalPrice: 195,
    pricePerDay: 195,
    availableQuantity: 4,
    securityDeposit: 300,
    condition: "Brand New",
    brand: "Sony",
    model: "ILME-FX6V",
    rentalTerms: "Certificate of camera insurance or full security deposit required. Return in hard flight case.",
    description: "Modular full-frame cinema camera with 4K 120p recording, 10-bit 4:2:2 DCI 4K output, electronic variable ND filter, and S-Cinetone color science. Includes 24-70mm and 70-200mm f/2.8 GM lenses and V-mount batteries.",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "Sony",
      Sensor: "35mm Full-Frame 10.2 MP CMOS",
      "Dynamic Range": "15+ stops",
      "Base ISO": "800 / 12,800",
      Media: "CFexpress Type A / SDXC"
    },
    location: {
      city: "Austin",
      state: "TX",
      address: "410 South Congress Ave"
    },
    availability: true,
    ownerId: "owner_seed_3",
    ownerName: "CineVault Camera Gear",
    ownerEmail: "gear@cinevault.com",
    status: "Approved",
    isFeatured: true,
    rating: 5.0,
    totalReviews: 18,
    totalBookings: 34,
    createdAt: new Date(Date.now() - 28 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "Ford F-550 Super Duty 16ft Flatbed Dump Truck",
    equipmentName: "Ford F-550 Super Duty 16ft Flatbed Dump Truck",
    category: "Vehicles & Transportation",
    rentalType: "Daily",
    rentalPrice: 220,
    pricePerDay: 220,
    availableQuantity: 2,
    securityDeposit: 400,
    condition: "Excellent",
    brand: "Ford",
    model: "F-550 PowerStroke",
    rentalTerms: "Valid CDL or commercial driver license required. Unlimited mileage within 150-mile radius.",
    description: "Rugged commercial flatbed dump truck with 6.7L PowerStroke V8 Turbo Diesel, dual rear wheels, heavy-duty hydraulic scissor hoist, and integrated fold-down steel contractor racks.",
    images: [
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "Ford Commercial",
      Engine: "6.7L V8 Turbo Diesel (475 hp)",
      Payload: "12,750 lbs",
      "Bed Length": "16 ft Steel Flatbed with Dumper",
      Transmission: "10-Speed TorqShift Automatic"
    },
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
    totalReviews: 12,
    totalBookings: 25,
    createdAt: new Date(Date.now() - 24 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "John Deere 3038E Compact Agricultural Utility Tractor",
    equipmentName: "John Deere 3038E Compact Agricultural Utility Tractor",
    category: "Agriculture Equipment",
    rentalType: "Weekly",
    rentalPrice: 180,
    pricePerDay: 180,
    availableQuantity: 2,
    securityDeposit: 350,
    condition: "Excellent",
    brand: "John Deere",
    model: "3038E 4WD",
    rentalTerms: "Includes front-end loader and rear rotary cutter. Clean machinery upon return.",
    description: "Versatile four-wheel-drive compact utility tractor with hydrostatic transmission, twin touch pedals, and Category 1 3-point hitch. Ideal for pasture mowing, grading, and material hauling.",
    images: [
      "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "John Deere",
      Engine: "Yanmar 3-Cylinder Diesel (37.3 hp)",
      Drivetrain: "4WD Hydrostatic 2-Range",
      "Lift Capacity at 24\":": "1,356 lbs (615 kg)",
      "PTO Power": "30 hp"
    },
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
    isFeatured: true,
    rating: 4.9,
    totalReviews: 10,
    totalBookings: 21,
    createdAt: new Date(Date.now() - 20 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "JBL PRX ONE 2,000W Powered Column Concert PA System",
    equipmentName: "JBL PRX ONE 2,000W Powered Column Concert PA System",
    category: "Event Equipment",
    rentalType: "Daily",
    rentalPrice: 130,
    pricePerDay: 130,
    availableQuantity: 5,
    securityDeposit: 200,
    condition: "Excellent",
    brand: "JBL Professional",
    model: "PRX ONE",
    rentalTerms: "Includes padded transport bags, XLR patch cables, and wireless microphone kit.",
    description: "Acoustically optimized 2,000-watt column array system with built-in 7-channel digital mixer, Lexicon DSP effects, Bluetooth audio streaming, and mobile app control. Great for corporate summits, outdoor concerts, and weddings.",
    images: [
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "JBL Professional",
      Model: "PRX ONE",
      "Peak Output": "2,000 Watts",
      "Max SPL": "130 dB",
      "Woofers": "12\" custom bass-reflex subwoofer",
      "Inputs": "4 XLR combo, 2 1/4\" Hi-Z, 1 3.5mm AUX"
    },
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
    createdAt: new Date(Date.now() - 16 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "FLIR T865 High-Performance Thermal Imaging Camera",
    equipmentName: "FLIR T865 High-Performance Thermal Imaging Camera",
    category: "Electronics",
    rentalType: "Daily",
    rentalPrice: 165,
    pricePerDay: 165,
    availableQuantity: 3,
    securityDeposit: 300,
    condition: "Brand New",
    brand: "FLIR Systems",
    model: "T865 24-degree",
    rentalTerms: "Delivered in waterproof Pelican case with two rechargeable lithium batteries and calibration certificate.",
    description: "Non-contact thermal inspection camera with 640x480 IR resolution, 1-Touch Level/Span, laser-assisted autofocus, and temperature measurement up to 1500°C for electrical substations and industrial facilities.",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "FLIR",
      "Thermal Resolution": "640 x 480 (307,200 pixels)",
      "Object Temp Range": "-40°C to 120°C / 0°C to 650°C",
      Accuracy: "±1°C (±1.8°F) or ±1%",
      Display: "4-inch 640x480 LCD with touch screen"
    },
    location: {
      city: "Dallas",
      state: "TX",
      address: "450 Logistics Pkwy"
    },
    availability: true,
    ownerId: "owner_seed_3",
    ownerName: "CineVault Camera Gear",
    ownerEmail: "gear@cinevault.com",
    status: "Approved",
    isFeatured: true,
    rating: 5.0,
    totalReviews: 7,
    totalBookings: 15,
    createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "Genie GS-1930 Electric Scissor Lift",
    equipmentName: "Genie GS-1930 Electric Scissor Lift",
    category: "Construction Equipment",
    rentalType: "Daily",
    rentalPrice: 145,
    pricePerDay: 145,
    availableQuantity: 4,
    securityDeposit: 250,
    condition: "Excellent",
    brand: "Genie",
    model: "GS-1930",
    rentalTerms: "Indoor and firm surface use only. Fall arrest harness required for all platform occupants.",
    description: "Quiet, zero-emission electric scissor lift capable of passing through standard single doorways. Ideal for indoor warehouse maintenance, electrical retrofits, ceiling ductwork, and staging.",
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "Genie",
      Model: "GS-1930",
      "Working Height": "7.79 m (25 ft)",
      "Platform Capacity": "227 kg (500 lbs)",
      "Machine Width": "0.76 m (30 in)",
      "Power Source": "24V DC Battery System"
    },
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
    isFeatured: false,
    rating: 5.0,
    totalReviews: 8,
    totalBookings: 22,
    createdAt: new Date(Date.now() - 12 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "Honda EU7000iS Inverter Generator 7000W Fuel Injected",
    equipmentName: "Honda EU7000iS Inverter Generator 7000W Fuel Injected",
    category: "Electronics",
    rentalType: "Daily",
    rentalPrice: 95,
    pricePerDay: 95,
    availableQuantity: 6,
    securityDeposit: 150,
    condition: "Excellent",
    brand: "Honda Power Equipment",
    model: "EU7000iS",
    rentalTerms: "Unleaded gasoline only. Operate strictly in well-ventilated outdoor environments.",
    description: "Super quiet fuel-injected portable inverter generator providing clean, stable power for sensitive electronic equipment, film sets, food trucks, and job site trailers. Electric push-button start.",
    images: [
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "Honda Power Equipment",
      Model: "EU7000iS",
      "Max Output": "7,000 Watts (120/240V)",
      "Rated Output": "5,500 Watts",
      "Noise Level": "52 to 58 dBA",
      "Run Time per Tank": "6.5 to 18.0 hours"
    },
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
    isFeatured: false,
    rating: 5.0,
    totalReviews: 15,
    totalBookings: 32,
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

import { NEW_20_EQUIPMENT } from "./add20Equipment.js";
export const ALL_SAMPLE_EQUIPMENT = [...SAMPLE_EQUIPMENT, ...NEW_20_EQUIPMENT];

export async function seedDatabase() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const equipmentCol = db.collection("equipment");

    const count = await equipmentCol.countDocuments();
    if (count === 0) {
      await equipmentCol.insertMany(ALL_SAMPLE_EQUIPMENT);
      console.log(`[Seed] Seeded ${ALL_SAMPLE_EQUIPMENT.length} equipment items across assignment categories.`);
    } else {
      console.log(`[Seed] Database already contains ${count} equipment items.`);
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
