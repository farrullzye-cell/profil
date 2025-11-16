export type WeatherCondition = {
    city: string;
    temperature: number;
    condition: 'Cerah' | 'Hujan' | 'Berawan';
};

// This is a mock service. In a real application, you would fetch this from a weather API.
export async function getWeather(city: string): Promise<WeatherCondition> {
    const conditions: Array<WeatherCondition['condition']> = ['Cerah', 'Hujan', 'Berawan'];
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Get a random condition to simulate daily changes
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    let temperature: number;

    switch (randomCondition) {
        case 'Cerah':
            temperature = Math.floor(Math.random() * (34 - 29 + 1)) + 29; // 29-34°C
            break;
        case 'Hujan':
            temperature = Math.floor(Math.random() * (27 - 24 + 1)) + 24; // 24-27°C
            break;
        case 'Berawan':
            temperature = Math.floor(Math.random() * (30 - 26 + 1)) + 26; // 26-30°C
            break;
    }

    return {
        city,
        temperature,
        condition: randomCondition,
    };
}
