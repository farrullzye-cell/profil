
export type HourlyForecast = {
    time: string;
    condition: 'Cerah' | 'Hujan' | 'Berawan' | 'Mendung';
    temperature: number;
    iconUrl: string;
};

export type WeatherCondition = {
    city: string;
    temperature: number;
    condition: 'Cerah' | 'Hujan' | 'Berawan' | 'Mendung';
    hourlyForecast: HourlyForecast[];
    iconUrl: string;
};

// Fungsi untuk memetakan kode cuaca dari API ke kondisi yang kita inginkan
function mapWeatherCondition(weatherId: number): 'Cerah' | 'Hujan' | 'Berawan' | 'Mendung' {
    // Group 2xx: Thunderstorm
    if (weatherId >= 200 && weatherId < 300) return 'Hujan';
    // Group 3xx: Drizzle
    if (weatherId >= 300 && weatherId < 400) return 'Hujan';
    // Group 5xx: Rain
    if (weatherId >= 500 && weatherId < 600) return 'Hujan';
    // Group 6xx: Snow (Dianggap hujan untuk Indonesia)
    if (weatherId >= 600 && weatherId < 700) return 'Hujan';
    // Group 7xx: Atmosphere (Mist, Smoke, etc)
    if (weatherId >= 700 && weatherId < 800) return 'Mendung';
    // Group 800: Clear
    if (weatherId === 800) return 'Cerah';
    // Group 80x: Clouds
    if (weatherId === 801 || weatherId === 802) return 'Berawan';
    if (weatherId === 803 || weatherId === 804) return 'Mendung';
    
    return 'Berawan';
}

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const LAT_SEMARANG = -6.966667;
const LON_SEMARANG = 110.433333;

export async function getWeather(city: string): Promise<WeatherCondition> {
    if (!API_KEY || API_KEY === "MASUKKAN_API_KEY_ANDA_DI_SINI") {
        throw new Error("API Key OpenWeatherMap belum diatur di file .env dengan prefix NEXT_PUBLIC_");
    }

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT_SEMARANG}&lon=${LON_SEMARANG}&appid=${API_KEY}&units=metric&lang=id`;
    
    try {
        const response = await fetch(forecastUrl);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Gagal mengambil data cuaca: ${errorData.message}`);
        }
        const data = await response.json();

        // Data cuaca saat ini (diambil dari item pertama prediksi)
        const currentWeatherData = data.list[0];
        const currentCondition = mapWeatherCondition(currentWeatherData.weather[0].id);
        const currentTemperature = Math.round(currentWeatherData.main.temp);
        const currentIcon = currentWeatherData.weather[0].icon;

        // Prediksi per jam (4 jam ke depan)
        const hourlyForecast: HourlyForecast[] = data.list.slice(1, 5).map((item: any) => {
            const date = new Date(item.dt * 1000);
            return {
                time: `${date.getHours().toString().padStart(2, '0')}:00`,
                condition: mapWeatherCondition(item.weather[0].id),
                temperature: Math.round(item.main.temp),
                iconUrl: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`
            };
        });

        return {
            city,
            temperature: currentTemperature,
            condition: currentCondition,
            hourlyForecast,
            iconUrl: `https://openweathermap.org/img/wn/${currentIcon}@2x.png`
        };

    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw new Error("Tidak dapat terhubung ke layanan cuaca.");
    }
}
