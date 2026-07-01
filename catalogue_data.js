const CATALOGUE_DATA = {
    singlesCollabs: [
        // Generate 68 tracks for Singles/Collabs (Rights Marketplace)
        ...Array.from({ length: 68 }, (_, i) => {
            const num = String(i + 1).padStart(3, '0');
            const fileExt = num === '002' ? 'mp3' : 'wav';
            const prices = ["$1,500", "$2,500", "$3,000", "$4,500", "$5,000"];
            
            return {
                id: `singles-${num}`,
                title: `Track ${num}`,
                file: `MDZ Catelogue/04_Singles_Collabs/Track-${num}.${fileExt}`,
                rights: "FULL OWNERSHIP",
                share: "100%",
                price: prices[i % prices.length],
                description: `Acquire 100% full master and publishing ownership rights for Track ${num}. This grants complete worldwide distribution rights and 100% of all royalties collected by PROs (ASCAP/BMI/PRS).`
            };
        })
    ],
    licensing: {
        handcrafted: Array.from({ length: 13 }, (_, i) => {
            const num = String(i + 1).padStart(3, '0');
            const fileExt = ['002', '003', '007'].includes(num) ? 'mp3' : 'wav';
            return {
                id: `licensing-hc-${num}`,
                title: `Track ${num}`,
                file: `MDZ Catelogue/01_Licensing_Library/Handcrafted/Track-${num}.${fileExt}`,
                duration: "2:45",
                genre: "Cinematic / Ambient"
            };
        }),
        lyria: Array.from({ length: 73 }, (_, i) => {
            const num = String(i + 1).padStart(3, '0');
            return {
                id: `licensing-lyria-${num}`,
                title: `Track ${num}`,
                file: `MDZ Catelogue/01_Licensing_Library/AI_Generations/Lyria/Track-${num}.wav`,
                duration: "3:10",
                genre: "AI Experimental / Trance"
            };
        }),
        yelo: Array.from({ length: 58 }, (_, i) => {
            const num = String(i + 1).padStart(3, '0');
            return {
                id: `licensing-yelo-${num}`,
                title: `Track ${num}`,
                file: `MDZ Catelogue/01_Licensing_Library/AI_Generations/Yelo/Track-${num}.wav`,
                duration: "2:55",
                genre: "AI Electronic / Lo-Fi"
            };
        })
    },
    portfolio: [
        { num: "001", ext: "wav", desc: "Main theme combining heavy percussion and modern synthesizer soundscapes." },
        { num: "002", ext: "wav", desc: "Audio used for the world's first live music inscription on the Bitcoin network." },
        { num: "003", ext: "wav", desc: "Live ambient track performed at Token 2049 in Singapore." },
        { num: "004", ext: "wav", desc: "Atmospheric soundtrack for the Elastos digital identity launch." },
        { num: "005", ext: "wav", desc: "High energy, fast-paced electronic track used in official Yelo announcements." },
        { num: "008", ext: "wav", desc: "Background corporate-ambient music designed for the Adpod interface." },
        { num: "009", ext: "wav", desc: "Cinematic intro music highlighting historical innovations in blockchain." },
        { num: "010", ext: "wav", desc: "Lo-fi beat capturing the night vibes of the capital city." },
        { num: "011", ext: "wav", desc: "Soaring synth leads matching aerial drone footage of Colombo." },
        { num: "012", ext: "wav", desc: "Chilled ambient textures and traditional vocals reflecting mountain peace." },
        { num: "013", ext: "wav", desc: "Nine Arch Bridge Sunset", desc: "Relaxed acoustic strings blended with deep electronic bass." },
        { num: "014", ext: "wav", desc: "Hikkaduwa Surf Soundscape", desc: "A upbeat summer chillout song featuring ocean wave sounds." },
        { num: "015", ext: "wav", desc: "Sinharaja Mystic Mist", desc: "Mysterious nature soundscape layered with warm analogue pads." },
        { num: "016", ext: "wav", desc: "Kandy Temple Sacred Percussion", desc: "Authentic low-end drums structured into a cinematic build-up." },
        { num: "017", ext: "wav", desc: "Ravana Falls Heavy Guitars", desc: "Aggressive guitar distortion overlaid with traditional rhythm patterns." },
        { num: "018", ext: "wav", desc: "Trinco Coastal Breeze", desc: "Chill, tropical ambient synth pad and light shaker percussion." },
        { num: "019", ext: "wav", desc: "Mirissa Ocean Deep Ambient", desc: "Extremely low frequency ambient drone simulating underwater environments." },
        { num: "020", ext: "wav", desc: "Ella Rock Sunset Chillout", desc: "A perfect blend of acoustic piano and soft electronic sub-bass." },
        { num: "022", ext: "mp3", desc: "Jaffna Cultural Fusion", desc: "A fusion track highlighting North Sri Lankan classical strings with sub-bass." }
    ].map((p, index) => {
        const displayNum = String(index + 1).padStart(3, '0');
        return {
            id: `portfolio-${p.num}`,
            title: `Track ${displayNum}`,
            file: `MDZ Catelogue/05_Portfolio/Track-${p.num}.${p.ext}`,
            description: p.desc
        };
    })
};
