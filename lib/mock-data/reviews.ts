export interface Review {
  id: string;
  tourId: string;
  reviewerName: string;
  reviewerCountry: string;
  rating: number;
  date: string;
  comment: string;
}

export const reviews: Review[] = [
  { id: 'r1', tourId: 't1', reviewerName: 'Sophia Müller', reviewerCountry: 'Germany', rating: 5, date: '2026-04-22', comment: 'Maria was an outstanding guide. We learned so much in 3 hours — felt like a private tour.' },
  { id: 'r2', tourId: 't1', reviewerName: 'James Patterson', reviewerCountry: 'UK', rating: 5, date: '2026-04-18', comment: 'The Astronomical Clock segment alone was worth the price. Bookable in two clicks.' },
  { id: 'r3', tourId: 't1', reviewerName: 'Pablo Hernandez', reviewerCountry: 'Spain', rating: 4, date: '2026-04-14', comment: 'Excellent walking pace and great storytelling. Wish it had been a bit longer.' },
  { id: 'r4', tourId: 't1', reviewerName: 'Aiko Tanaka', reviewerCountry: 'Japan', rating: 5, date: '2026-04-10', comment: 'A perfect introduction to Prague. The Jewish Quarter stop was deeply moving.' },
  { id: 'r5', tourId: 't1', reviewerName: 'Marco Bianchi', reviewerCountry: 'Italy', rating: 5, date: '2026-04-05', comment: "Best 25 euros we spent in the city. Don't skip the Powder Tower at the end." },

  { id: 'r6', tourId: 't2', reviewerName: 'Catherine Wilson', reviewerCountry: 'Canada', rating: 5, date: '2026-04-29', comment: 'The Spanish-speaking guide was incredibly knowledgeable. Castle complex is enormous.' },
  { id: 'r7', tourId: 't2', reviewerName: 'Pierre Dubois', reviewerCountry: 'France', rating: 5, date: '2026-04-21', comment: 'Loved the Golden Lane and Kafka connection. Skip-the-line was a real benefit.' },
  { id: 'r8', tourId: 't2', reviewerName: 'Carlos Rivera', reviewerCountry: 'Mexico', rating: 4, date: '2026-04-17', comment: 'Long but worth it. Bring water and comfortable shoes.' },
  { id: 'r9', tourId: 't2', reviewerName: 'Elena Petrova', reviewerCountry: 'Bulgaria', rating: 5, date: '2026-04-09', comment: 'Marco kept the group engaged the whole time. Excellent value.' },

  { id: 'r10', tourId: 't3', reviewerName: 'Tom O\'Brien', reviewerCountry: 'Ireland', rating: 5, date: '2026-04-27', comment: 'Pure magic. Three pubs, three styles of beer, zero tourist traps.' },
  { id: 'r11', tourId: 't3', reviewerName: 'Jonas Lindqvist', reviewerCountry: 'Sweden', rating: 5, date: '2026-04-19', comment: "The microbrewery tasting was a highlight. Our guide knew every brewer by name." },
  { id: 'r12', tourId: 't3', reviewerName: 'Anna Kowalski', reviewerCountry: 'Poland', rating: 5, date: '2026-04-13', comment: 'Authentic, friendly, and the beer-and-cheese pairing was perfect.' },
  { id: 'r13', tourId: 't3', reviewerName: 'Olivia Bennett', reviewerCountry: 'Australia', rating: 5, date: '2026-04-06', comment: "Loved it. Skip the big bars in Old Town and book this instead." },

  { id: 'r14', tourId: 't4', reviewerName: 'Henri Dupont', reviewerCountry: 'France', rating: 5, date: '2026-04-26', comment: 'Heavy subject handled with care. Personal stories made it unforgettable.' },
  { id: 'r15', tourId: 't4', reviewerName: 'Sarah Johnson', reviewerCountry: 'USA', rating: 4, date: '2026-04-15', comment: 'Eye-opening tour. Brought 1989 to life.' },
  { id: 'r16', tourId: 't4', reviewerName: 'Wei Chen', reviewerCountry: 'Singapore', rating: 5, date: '2026-04-07', comment: 'Excellent context for understanding modern Czech identity.' },

  { id: 'r17', tourId: 't5', reviewerName: 'Rachel Goldstein', reviewerCountry: 'USA', rating: 5, date: '2026-04-25', comment: 'A respectful, deeply researched tour. The Old-New Synagogue is breathtaking.' },
  { id: 'r18', tourId: 't5', reviewerName: 'David Mendel', reviewerCountry: 'Israel', rating: 5, date: '2026-04-12', comment: 'The cemetery tour brought me to tears. Highly recommended.' },

  { id: 'r19', tourId: 't6', reviewerName: 'Lucia Esposito', reviewerCountry: 'Italy', rating: 5, date: '2026-04-28', comment: 'Sunset cruise with wine was the perfect way to end our trip.' },
  { id: 'r20', tourId: 't6', reviewerName: 'Inga Olsen', reviewerCountry: 'Norway', rating: 4, date: '2026-04-20', comment: 'Beautiful views, but the boat was crowded.' },

  { id: 'r21', tourId: 't7', reviewerName: 'Michael Brown', reviewerCountry: 'UK', rating: 5, date: '2026-04-30', comment: 'Charles Bridge at midnight is a different city entirely.' },
  { id: 'r22', tourId: 't7', reviewerName: 'Alice Wong', reviewerCountry: 'Hong Kong', rating: 5, date: '2026-04-23', comment: 'Magical. The ghost stories were a fun touch.' },

  { id: 'r23', tourId: 't8', reviewerName: 'Robert Smith', reviewerCountry: 'UK', rating: 5, date: '2026-04-24', comment: 'Six tastings is a real meal — come hungry. Loved the trdelnik!' },
  { id: 'r24', tourId: 't8', reviewerName: 'Giulia Romano', reviewerCountry: 'Italy', rating: 5, date: '2026-04-16', comment: 'Best Czech food experience. The chef host was charming.' },

  { id: 'r25', tourId: 't10', reviewerName: 'John Doe', reviewerCountry: 'USA', rating: 5, date: '2026-04-11', comment: "Karlstejn is gorgeous. Coach pickup was punctual." },
  { id: 'r26', tourId: 't10', reviewerName: 'Sophia Müller', reviewerCountry: 'Germany', rating: 4, date: '2026-04-08', comment: 'Castle was packed but the guide kept us moving.' },

  { id: 'r27', tourId: 't13', reviewerName: 'Marta Sanchez', reviewerCountry: 'Spain', rating: 5, date: '2026-04-29', comment: "Fisherman's Bastion views are unbeatable. Worth every euro." },
  { id: 'r28', tourId: 't13', reviewerName: 'James Patterson', reviewerCountry: 'UK', rating: 5, date: '2026-04-21', comment: 'Matthias Church was stunning. Hanna is a wonderful guide.' },

  { id: 'r29', tourId: 't15', reviewerName: 'Pierre Dubois', reviewerCountry: 'France', rating: 5, date: '2026-04-26', comment: 'Skip-the-line at Szechenyi is essential. The Tokaj snack was a nice touch.' },
  { id: 'r30', tourId: 't15', reviewerName: 'Lukas Becker', reviewerCountry: 'Germany', rating: 4, date: '2026-04-19', comment: 'Relaxing experience. Outdoor pools were the highlight.' },

  { id: 'r31', tourId: 't16', reviewerName: 'Diego Morales', reviewerCountry: 'Mexico', rating: 5, date: '2026-04-30', comment: 'Best night out we had in Europe. Szimpla Kert is unreal.' },
  { id: 'r32', tourId: 't16', reviewerName: 'Chiara Conti', reviewerCountry: 'Italy', rating: 5, date: '2026-04-22', comment: "Our guide's playlist made the whole crawl. Two-shot welcome was generous." },

  { id: 'r33', tourId: 't17', reviewerName: 'Sarah Johnson', reviewerCountry: 'USA', rating: 4, date: '2026-04-27', comment: 'Beautiful sunset. Boat was clean and the Tokaji was great.' },
  { id: 'r34', tourId: 't17', reviewerName: 'Wei Chen', reviewerCountry: 'Singapore', rating: 5, date: '2026-04-13', comment: 'Best photo opportunity in Budapest. Highly recommended.' },

  { id: 'r35', tourId: 't19', reviewerName: 'Felix Wagner', reviewerCountry: 'Austria', rating: 5, date: '2026-04-28', comment: 'The Hofburg context was excellent. Manageable 2.5-hour pace.' },
  { id: 'r36', tourId: 't19', reviewerName: 'Marco Bianchi', reviewerCountry: 'Italy', rating: 5, date: '2026-04-18', comment: 'A perfect Vienna introduction. Ring boulevard is impressive.' },

  { id: 'r37', tourId: 't20', reviewerName: 'Catherine Wilson', reviewerCountry: 'Canada', rating: 5, date: '2026-04-24', comment: "Sisi's apartments were the highlight. Skip-the-line saved us 2 hours." },
  { id: 'r38', tourId: 't20', reviewerName: 'Carlos Rivera', reviewerCountry: 'Mexico', rating: 5, date: '2026-04-14', comment: 'The Gloriette view alone was worth the trip.' },

  { id: 'r39', tourId: 't21', reviewerName: 'Anna Kowalski', reviewerCountry: 'Poland', rating: 5, date: '2026-04-25', comment: 'Our guide was an actual classical musician. Unique perspective.' },
  { id: 'r40', tourId: 't22', reviewerName: 'Olivia Bennett', reviewerCountry: 'Australia', rating: 5, date: '2026-04-17', comment: 'Three coffee houses, three pastries, three hours of pure joy.' },
];
