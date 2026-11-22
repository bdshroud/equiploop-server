import { getCollection } from "../config/db.js";

export const DEFAULT_CATEGORIES = [
  {
    slug: "construction",
    name: "Construction",
    description: "Concrete mixers, scaffolding, compactors, and demolition hammers.",
    icon: "HardHat",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "heavy-machinery",
    name: "Heavy Machinery",
    description: "Excavators, skid steers, forklifts, and backhoes for large operations.",
    icon: "Tractor",
    image: "https://images.unsplash.com/photo-1579847188804-ecba0e2ea330?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "power-tools",
    name: "Power Tools",
    description: "Rotary drills, circular saws, angle grinders, and router systems.",
    icon: "Wrench",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "landscaping",
    name: "Landscaping & Gardening",
    description: "Wood chippers, lawn aerators, sod cutters, and commercial mowers.",
    icon: "Trees",
    image: "https://images.unsplash.com/photo-1557429287-b2e26467fc2b?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "audio-visual",
    name: "Audio/Visual & Event Tech",
    description: "Line array speakers, stage lighting, projectors, and broadcast gear.",
    icon: "Speaker",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "material-handling",
    name: "Material Handling",
    description: "Pallet jacks, scissor lifts, manual cranes, and warehouse hoists.",
    icon: "Boxes",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "cleaning-restoration",
    name: "Cleaning & Restoration",
    description: "Industrial pressure washers, floor scrubbers, and dehumidifiers.",
    icon: "Sparkles",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "generators-power",
    name: "Generators & Power",
    description: "Diesel generators, portable power stations, and distribution boxes.",
    icon: "Zap",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
  },
];

export async function getCategories(req, res, next) {
  try {
    const equipmentCollection = getCollection("equipment");

    // Aggregate equipment counts by category
    const counts = await equipmentCollection
      .aggregate([
        { $match: { status: "Approved" } },
        { $group: { _id: "$category", count: { $sum: 1 } } },
      ])
      .toArray();

    const countMap = {};
    counts.forEach((c) => {
      countMap[c._id] = c.count;
    });

    const categoriesWithCount = DEFAULT_CATEGORIES.map((cat) => ({
      ...cat,
      itemCount: countMap[cat.name] || countMap[cat.slug] || 0,
    }));

    res.status(200).json({
      success: true,
      categories: categoriesWithCount,
    });
  } catch (err) {
    next(err);
  }
}
