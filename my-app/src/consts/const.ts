export const MENU_ARRAY = [
    {
        name: 'Главная',
        link: '/',
        icon: 'home'
    },
    {
        name: 'Программа',
        link: '/program',
        icon: 'exercise'
    },
    {
        name: 'Календарь',
        link: '/calendar',
        icon: 'calendar'
    },
    {
        name: 'Профиль',
        link: '/personal',
        icon: 'profile'
    },
];

export const GENDERS:string[] = ['male', 'female'];
export const Targets:string[] = ['Loose weight', 'Gain Weight', 'Stay Fit'];
export const DAYS_NAMES:string[] = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
export const SECS = 60;

export const WEIGHT_INDEXES = [
    {
        name:'Severe underweight',
        text: 'Need urgent expert advice',
        min: 0,
        max: 15.99
    },{    
        name: 'Insufficient (deficit) body weight',
        text: 'Need expert advice',
        min: 16,
        max: 18.49
    },{    
        name: 'Norm',
        text: 'Keep it up!',
        min: 18.50,
        max: 24.99
    },{    
        name: 'Overweight (preobesity)',
        text: 'Need expert advice',
        min: 25.00,
        max: 29.99
    },{    
        name: 'Obesity of the first degree',
        text: 'Need expert advice',
        min: 30,
        max: 34.99
    },{    
        name: 'Obesity of the second degree',
        text: 'Need expert advice',
        min: 35,
        max: 39.99
    },{    
        name: 'Obesity of the third degree',
        text: 'Need expert advice',
        min: 40,
        max: 60
    }
]