import { useState, useEffect } from 'react';

// Taxas de conversão base (1 EUR = X)
const EXCHANGE_RATES = {
    EUR: 1,
    AOA: 990, // 1 EUR ≈ 990 AOA (Kwanza Angolano)
    USD: 1.09, // 1 EUR ≈ 1.09 USD
    BRL: 5.35, // 1 EUR ≈ 5.35 BRL (Real Brasileiro)
    GBP: 0.86, // 1 EUR ≈ 0.86 GBP (Libra Esterlina)
    ZAR: 19.50, // 1 EUR ≈ 19.50 ZAR (Rand Sul-Africano)
    MZN: 69.50, // 1 EUR ≈ 69.50 MZN (Metical Moçambicano)
    CNY: 7.85, // 1 EUR ≈ 7.85 CNY (Yuan Chinês)
    CAD: 1.46, // 1 EUR ≈ 1.46 CAD (Dólar Canadense)
    AUD: 1.63, // 1 EUR ≈ 1.63 AUD (Dólar Australiano)
    JPY: 156.50, // 1 EUR ≈ 156.50 JPY (Iene Japonês)
    CHF: 0.93, // 1 EUR ≈ 0.93 CHF (Franco Suíço)
    ARS: 1080, // 1 EUR ≈ 1080 ARS (Peso Argentino)
    MXN: 21.50, // 1 EUR ≈ 21.50 MXN (Peso Mexicano)
};

// Símbolos de moeda
export const CURRENCY_SYMBOLS = {
    EUR: '€',
    AOA: 'Kz',
    USD: '$',
    BRL: 'R$',
    GBP: '£',
    ZAR: 'R', // Rand
    MZN: 'MT', // Metical
    CNY: '¥', // Yuan
    CAD: 'C$', // Dólar Canadense
    AUD: 'A$', // Dólar Australiano
    JPY: '¥', // Iene
    CHF: 'CHF', // Franco Suíço
    ARS: '$', // Peso Argentino
    MXN: 'MX$', // Peso Mexicano
};

// Bandeiras dos países (imagens SVG via CDN)
export const CURRENCY_FLAGS = {
    EUR: 'https://flagcdn.com/eu.svg', // União Europeia
    AOA: 'https://flagcdn.com/ao.svg', // Angola
    USD: 'https://flagcdn.com/us.svg', // Estados Unidos
    BRL: 'https://flagcdn.com/br.svg', // Brasil
    GBP: 'https://flagcdn.com/gb.svg', // Reino Unido
    ZAR: 'https://flagcdn.com/za.svg', // África do Sul
    MZN: 'https://flagcdn.com/mz.svg', // Moçambique
    CNY: 'https://flagcdn.com/cn.svg', // China
    CAD: 'https://flagcdn.com/ca.svg', // Canadá
    AUD: 'https://flagcdn.com/au.svg', // Austrália
    JPY: 'https://flagcdn.com/jp.svg', // Japão
    CHF: 'https://flagcdn.com/ch.svg', // Suíça
    ARS: 'https://flagcdn.com/ar.svg', // Argentina
    MXN: 'https://flagcdn.com/mx.svg', // México
};

// Códigos de país para nomes
export const CURRENCY_COUNTRY_NAMES = {
    EUR: 'Europa',
    AOA: 'Angola',
    USD: 'EUA',
    BRL: 'Brasil',
    GBP: 'Reino Unido',
    ZAR: 'África do Sul',
    MZN: 'Moçambique',
    CNY: 'China',
    CAD: 'Canadá',
    AUD: 'Austrália',
    JPY: 'Japão',
    CHF: 'Suíça',
    ARS: 'Argentina',
    MXN: 'México',
};

// Mapa de países para moedas
const COUNTRY_TO_CURRENCY = {
    AO: 'AOA', // Angola
    PT: 'EUR', // Portugal
    BR: 'BRL', // Brasil
    US: 'USD', // Estados Unidos
    GB: 'GBP', // Reino Unido
    ZA: 'ZAR', // África do Sul (South Africa)
    MZ: 'MZN', // Moçambique
    CN: 'CNY', // China
    CA: 'CAD', // Canadá
    AU: 'AUD', // Austrália
    JP: 'JPY', // Japão
    CH: 'CHF', // Suíça
    AR: 'ARS', // Argentina
    MX: 'MXN', // México
    // Países da Zona Euro
    DE: 'EUR', ES: 'EUR', FR: 'EUR', IT: 'EUR', NL: 'EUR',
    BE: 'EUR', AT: 'EUR', IE: 'EUR', FI: 'EUR', GR: 'EUR',
    // Mais países podem ser adicionados
};

export function useCurrency() {
    const [currency, setCurrency] = useState<string>('AOA'); // Padrão: Kwanza
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        detectCurrency();
    }, []);

    const detectCurrency = async () => {
        try {
            // Tentar detectar país via IP usando ipapi.co (grátis, sem chave)
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();

            const countryCode = data.country_code;
            const detectedCurrency = COUNTRY_TO_CURRENCY[countryCode] || 'AOA';

            // Verificar se há preferência salva no localStorage
            const savedCurrency = localStorage.getItem('preferred_currency');

            setCurrency(savedCurrency || detectedCurrency);
        } catch (error) {
            console.log('Não foi possível detectar o país. Usando moeda padrão.');
            // Se falhar, usar moeda salva ou padrão
            const savedCurrency = localStorage.getItem('preferred_currency');
            setCurrency(savedCurrency || 'AOA');
        } finally {
            setIsLoading(false);
        }
    };

    const changeCurrency = (newCurrency: string) => {
        setCurrency(newCurrency);
        localStorage.setItem('preferred_currency', newCurrency);
    };

    // Função para converter preço
    const convertPrice = (priceInEur: number): string => {
        const rate = EXCHANGE_RATES[currency];
        const converted = priceInEur * rate;
        const symbol = CURRENCY_SYMBOLS[currency];

        // Formatar número
        if (currency === 'AOA' || currency === 'MZN' || currency === 'ARS' || currency === 'JPY') {
            // Moedas sem decimais
            return `${converted.toLocaleString('pt-PT', { maximumFractionDigits: 0 })} ${symbol}`;
        }
        if (currency === 'ZAR') {
            // Rand com símbolo na frente
            return `${symbol}${converted.toLocaleString('en-ZA', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
        }
        return `${symbol}${converted.toLocaleString('pt-PT', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    };

    // Função para converter faixa de preço (ex: "150-400")
    const convertPriceRange = (minEur: number, maxEur: number): string => {
        const rate = EXCHANGE_RATES[currency];
        const minConverted = minEur * rate;
        const maxConverted = maxEur * rate;
        const symbol = CURRENCY_SYMBOLS[currency];

        if (currency === 'AOA' || currency === 'MZN' || currency === 'ARS' || currency === 'JPY') {
            // Moedas sem decimais
            return `${minConverted.toLocaleString('pt-PT', { maximumFractionDigits: 0 })} - ${maxConverted.toLocaleString('pt-PT', { maximumFractionDigits: 0 })} ${symbol}`;
        }
        if (currency === 'ZAR') {
            // Rand com símbolo na frente
            return `${symbol}${minConverted.toLocaleString('en-ZA', { maximumFractionDigits: 0 })} - ${symbol}${maxConverted.toLocaleString('en-ZA', { maximumFractionDigits: 0 })}`;
        }
        return `${symbol}${minConverted.toLocaleString('pt-PT', { maximumFractionDigits: 0 })} - ${symbol}${maxConverted.toLocaleString('pt-PT', { maximumFractionDigits: 0 })}`;
    };

    return {
        currency,
        changeCurrency,
        convertPrice,
        convertPriceRange,
        isLoading,
        availableCurrencies: Object.keys(EXCHANGE_RATES),
        currencySymbol: CURRENCY_SYMBOLS[currency],
    };
}
