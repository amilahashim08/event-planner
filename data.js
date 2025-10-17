// Sample data for the Event Management Platform
// This file contains sample events, contacts, and other data for demonstration

// Sample Events Data
window.sampleEvents = [
    {
        id: 1,
        title: "Klaus & Caroline Wedding",
        type: "Wedding",
        date: "2025-05-25",
        time: "19:00",
        location: "Maius Cathedral, Spain Catalonia",
        venue: "Maius Cathedral",
        description: "A beautiful wedding ceremony celebrating the union of Klaus and Caroline.",
        budget: 30000,
        guestCount: 100,
        progress: 80,
        status: "upcoming",
        organizers: [
            {
                name: "Caroline Forbes",
                email: "caroline@gmail.com",
                role: "Bride",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
            },
            {
                name: "Klaus Mikaelson",
                email: "klaus@gmail.com",
                role: "Groom",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
            }
        ],
        teamMembers: [
            { number: "01", name: "Tyler Collins", role: "Florist" },
            { number: "02", name: "Alan Powell", role: "Photographer" },
            { number: "03", name: "Justin Wood", role: "Videographer" }
        ],
        guests: [
            {
                id: 1234,
                firstName: "Marie",
                lastName: "Coleman",
                prefix: "Family",
                relation: "Sister",
                whatsapp: "1234567890",
                status: "invited",
                response: "attending",
                inviteCount: 10
            },
            {
                id: 1235,
                firstName: "Barabara",
                lastName: "Wells",
                prefix: "Miss",
                relation: "Friend",
                whatsapp: "1234567890",
                status: "pending",
                response: "not-attending",
                inviteCount: 23
            },
            {
                id: 1236,
                firstName: "Fiona",
                lastName: "Alvarado",
                prefix: "Mr",
                relation: "Friend",
                whatsapp: "1234567890",
                status: "invited",
                response: "no-response",
                inviteCount: 12
            },
            {
                id: 1237,
                firstName: "Beatrice",
                lastName: "Sanders",
                prefix: "Mrs",
                relation: "Friend",
                whatsapp: "1234567890",
                status: "pending",
                response: "attending",
                inviteCount: 16
            },
            {
                id: 1238,
                firstName: "Carol",
                lastName: "Hughes",
                prefix: "+1",
                relation: "Friend",
                whatsapp: "1234567890",
                status: "invited",
                response: "not-attending",
                inviteCount: 15
            }
        ],
        checklist: {
            "Pre-Wedding Planning": {
                progress: 70,
                tasks: [
                    {
                        id: 1,
                        text: "Finalize wedding date and time",
                        completed: true,
                        dueDate: "2025-05-24",
                        assignee: "Caroline Forbes"
                    },
                    {
                        id: 2,
                        text: "Book ceremony and reception venues",
                        completed: false,
                        dueDate: null,
                        assignee: null
                    },
                    {
                        id: 3,
                        text: "Create initial guest list",
                        completed: false,
                        dueDate: null,
                        assignee: null
                    }
                ]
            },
            "Design & Styling": {
                progress: 70,
                tasks: [
                    {
                        id: 4,
                        text: "Choose wedding theme and color palette",
                        completed: true,
                        dueDate: "2025-05-24",
                        assignee: "Caroline Forbes"
                    }
                ]
            },
            "Photography": {
                progress: 70,
                tasks: []
            },
            "Videography": {
                progress: 70,
                tasks: []
            }
        },
        budget: {
            total: 30000,
            sections: [
                {
                    name: "Venue",
                    allocated: 11000,
                    items: [
                        {
                            category: "Florist",
                            budgeted: 5000,
                            actual: 6000,
                            vendor: "Tyler Murphy",
                            vendorContact: "1234567890",
                            paymentType: "Cash",
                            payer: "Jonathan Freeman",
                            status: "unpaid",
                            locked: true,
                            paymentProof: "paid"
                        },
                        {
                            category: "Photographer",
                            budgeted: 5000,
                            actual: 4000,
                            vendor: "Jacob Evans",
                            vendorContact: "1234567890",
                            paymentType: "Cash",
                            payer: "Keanu McDonald",
                            status: "paid",
                            locked: false,
                            paymentProof: "Picture.png"
                        },
                        {
                            category: "Videographer",
                            budgeted: 5000,
                            actual: 4000,
                            vendor: "Tom Meyer",
                            vendorContact: "1234567890",
                            paymentType: "Cash",
                            payer: "Nick Hughes",
                            status: "paid",
                            locked: false,
                            paymentProof: "Add Image"
                        },
                        {
                            category: "Florist",
                            budgeted: 1000,
                            actual: 1000,
                            vendor: "Joe Mark",
                            vendorContact: "1234567890",
                            paymentType: "Cash",
                            payer: "Brandon Gilbert",
                            status: "unpaid",
                            locked: false,
                            paymentProof: "Picture.png"
                        }
                    ]
                }
            ]
        }
    },
    {
        id: 2,
        title: "Emma's 10th Birthday",
        type: "Birthday",
        date: "2025-06-15",
        time: "15:00",
        location: "Community Center",
        venue: "Main Hall",
        description: "A fun birthday party for Emma's 10th birthday with games and cake.",
        budget: 1500,
        guestCount: 25,
        progress: 45,
        status: "upcoming",
        organizers: [
            {
                name: "Sarah Johnson",
                email: "sarah@gmail.com",
                role: "Mother",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
            }
        ],
        teamMembers: [],
        guests: [],
        checklist: {},
        budget: { total: 1500, sections: [] }
    },
    {
        id: 3,
        title: "Annual Conference",
        type: "Corporate",
        date: "2025-07-20",
        time: "09:00",
        location: "Convention Center",
        venue: "Hall A",
        description: "Annual corporate conference with keynote speakers and networking.",
        budget: 15000,
        guestCount: 200,
        progress: 30,
        status: "upcoming",
        organizers: [
            {
                name: "Michael Chen",
                email: "michael@company.com",
                role: "Event Manager",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
            }
        ],
        teamMembers: [],
        guests: [],
        checklist: {},
        budget: { total: 15000, sections: [] }
    },
    {
        id: 4,
        title: "Samantha's Baby Shower",
        type: "Baby Shower",
        date: "2025-05-10",
        time: "14:00",
        location: "Garden Venue",
        venue: "Rose Garden",
        description: "A beautiful baby shower celebrating the upcoming arrival.",
        budget: 2500,
        guestCount: 40,
        progress: 60,
        status: "upcoming",
        organizers: [
            {
                name: "Lisa Williams",
                email: "lisa@gmail.com",
                role: "Host",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face"
            }
        ],
        teamMembers: [],
        guests: [],
        checklist: {},
        budget: { total: 2500, sections: [] }
    },
    {
        id: 5,
        title: "Caroline Graduation",
        type: "Graduation Party",
        date: "2025-05-30",
        time: "18:00",
        location: "Backyard",
        venue: "Home",
        description: "Graduation celebration for Caroline's achievement.",
        budget: 1200,
        guestCount: 35,
        progress: 25,
        status: "upcoming",
        organizers: [
            {
                name: "Robert Smith",
                email: "robert@gmail.com",
                role: "Father",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
            }
        ],
        teamMembers: [],
        guests: [],
        checklist: {},
        budget: { total: 1200, sections: [] }
    },
    {
        id: 6,
        title: "Golden Anniversary Wedding",
        type: "Anniversary",
        date: "2025-08-12",
        time: "17:00",
        location: "Country Club",
        venue: "Grand Ballroom",
        description: "50th wedding anniversary celebration.",
        budget: 8000,
        guestCount: 80,
        progress: 15,
        status: "upcoming",
        organizers: [
            {
                name: "Dorothy Miller",
                email: "dorothy@gmail.com",
                role: "Daughter",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
            }
        ],
        teamMembers: [],
        guests: [],
        checklist: {},
        budget: { total: 8000, sections: [] }
    },
    {
        id: 7,
        title: "Company Gathering",
        type: "Corporate",
        date: "2025-09-05",
        time: "19:00",
        location: "Hotel Ballroom",
        venue: "Grand Hotel",
        description: "Annual company gathering and awards ceremony.",
        budget: 12000,
        guestCount: 150,
        progress: 20,
        status: "upcoming",
        organizers: [
            {
                name: "James Wilson",
                email: "james@company.com",
                role: "HR Manager",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
            }
        ],
        teamMembers: [],
        guests: [],
        checklist: {},
        budget: { total: 12000, sections: [] }
    },
    {
        id: 8,
        title: "Family Dinner",
        type: "Other Event",
        date: "2025-06-01",
        time: "18:30",
        location: "Home",
        venue: "Dining Room",
        description: "Family reunion dinner with extended family.",
        budget: 800,
        guestCount: 20,
        progress: 40,
        status: "upcoming",
        organizers: [
            {
                name: "Patricia Davis",
                email: "patricia@gmail.com",
                role: "Host",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
            }
        ],
        teamMembers: [],
        guests: [],
        checklist: {},
        budget: { total: 800, sections: [] }
    }
];

// Event Type Distribution Data
window.eventTypeDistribution = {
    "Wedding": 50,
    "Corporate": 20,
    "Birthday": 10,
    "Baby Shower": 10,
    "Anniversary": 5,
    "Graduation Party": 3,
    "Other Event": 2
};

// RSVP Rate Data by Month
window.rsvpRateData = [
    { month: 'Jan', rate: 20 },
    { month: 'Feb', rate: 80 },
    { month: 'Mar', rate: 45 },
    { month: 'Apr', rate: 30 },
    { month: 'May', rate: 70 },
    { month: 'Jun', rate: 55 },
    { month: 'Jul', rate: 85 },
    { month: 'Aug', rate: 60 },
    { month: 'Sep', rate: 75 },
    { month: 'Oct', rate: 40 },
    { month: 'Nov', rate: 65 },
    { month: 'Dec', rate: 90 }
];

// Sample Contacts Data
window.sampleContacts = [
    {
        id: 1,
        firstName: "Tyler",
        lastName: "Collins",
        email: "tyler.collins@gmail.com",
        phone: "1234567890",
        role: "Florist",
        company: "Collins Flowers",
        notes: "Specializes in wedding arrangements"
    },
    {
        id: 2,
        firstName: "Alan",
        lastName: "Powell",
        email: "alan.powell@photography.com",
        phone: "1234567891",
        role: "Photographer",
        company: "Powell Photography",
        notes: "Award-winning wedding photographer"
    },
    {
        id: 3,
        firstName: "Justin",
        lastName: "Wood",
        email: "justin.wood@video.com",
        phone: "1234567892",
        role: "Videographer",
        company: "Wood Video Productions",
        notes: "Cinematic wedding videography"
    }
];

// Sample Templates Data
window.sampleTemplates = [
    {
        id: 1,
        name: "Wedding Planning Checklist",
        type: "checklist",
        description: "Complete checklist for wedding planning",
        category: "Wedding"
    },
    {
        id: 2,
        name: "Birthday Party Template",
        type: "event",
        description: "Template for birthday party planning",
        category: "Birthday"
    },
    {
        id: 3,
        name: "Corporate Event Template",
        type: "event",
        description: "Template for corporate event planning",
        category: "Corporate"
    }
];

// Dashboard Stats
window.dashboardStats = {
    upcomingEvents: 5,
    totalEvents: 24,
    tasksDue: 8,
    rsvpsPending: 12
};

// Utility function to get events by date
window.getEventsByDate = function(dateString) {
    return window.sampleEvents.filter(event => event.date === dateString);
};

// Utility function to get upcoming events
window.getUpcomingEvents = function() {
    const today = new Date();
    return window.sampleEvents.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= today && event.status === 'upcoming';
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
};

// Utility function to get event by ID
window.getEventById = function(id) {
    return window.sampleEvents.find(event => event.id === parseInt(id));
};

console.log('Sample data loaded successfully');
console.log('Events:', window.sampleEvents.length);
console.log('Contacts:', window.sampleContacts.length);
console.log('Templates:', window.sampleTemplates.length);
