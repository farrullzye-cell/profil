
export type HourlyForecast = {
    time: string;
    condition: 'Cerah' | 'Hujan' | 'Berawan';
    temperature: number;
};

export type WeatherCondition = {
    city: string;
    temperature: number;
    condition: 'Cerah' | 'Hujan' | 'Berawan';
    hourlyForecast: HourlyForecast[];
};

function getRandomCondition(): 'Cerah' | 'Hujan' | 'Berawan' {
    const conditions: Array<'Cerah' | 'Hujan' | 'Berawan'> = ['Cerah', 'Hujan', 'Berawan'];
    return conditions[Math.floor(Math.random() * conditions.length)];
}

function getTemperatureForCondition(condition: 'Cerah' | 'Hujan' | 'Berawan'): number {
     switch (condition) {
        case 'Cerah':
            return Math.floor(Math.random() * (34 - 29 + 1)) + 29; // 29-34°C
        case 'Hujan':
            return Math.floor(Math.random() * (27 - 24 + 1)) + 24; // 24-27°C
        case 'Berawan':
            return Math.floor(Math.random() * (30 - 26 + 1)) + 26; // 26-30°C
    }
}


// This is a mock service. In a real application, you would fetch this from a weather API.
export async function getWeather(city: string): Promise<WeatherCondition> {
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const currentCondition = getRandomCondition();
    const currentTemperature = getTemperatureForCondition(currentCondition);

    // Generate hourly forecast for the next 4 hours
    const hourlyForecast: HourlyForecast[] = [];
    const currentHour = new Date().getHours();
    for (let i = 1; i <= 4; i++) {
        const forecastHour = (currentHour + i) % 24;
        const condition = getRandomCondition();
        const temperature = getTemperatureForCondition(condition);
        hourlyForecast.push({
            time: `${forecastHour.toString().padStart(2, '0')}:00`,
            condition,
            temperature,
        });
    }


    return {
        city,
        temperature: currentTemperature,
        condition: currentCondition,
        hourlyForecast,
    };
}
