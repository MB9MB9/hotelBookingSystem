import React, { useState } from 'react';
import axios from 'axios';

const provinces = [
    'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 
    'Artvin', 'Aydın', 'Balıkesir', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 
    'Bursa', 'Çanakkale', 'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Edirne', 
    'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 
    'Hakkâri', 'Hatay', 'Isparta', 'Mersin', 'İstanbul', 'İzmir', 'Kars', 'Kastamonu', 
    'Kayseri', 'Kırklareli', 'Kırşehir', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 
    'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 
    'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Tekirdağ', 'Tokat', 
    'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak', 'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 
    'Bayburt', 'Karaman', 'Kırıkkale', 'Batman', 'Şırnak', 'Bartın', 'Ardahan', 
    'Iğdır', 'Yalova', 'Karabük', 'Kilis', 'Osmaniye', 'Düzce'
];

const BookingForm = () => {
    const [destination, setDestination] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [hotels, setHotels] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [paymentInfo, setPaymentInfo] = useState({ cardNumber: '', expiryDate: '', cvv: '' });
    const [bookedHotel, setBookedHotel] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:5001/api/hotels/${destination}`);
            setHotels(response.data);
        } catch (error) {
            console.error('Error fetching hotels:', error);
        }
    };

    const handleBookHotel = (hotelName) => {
        setSelectedHotel(hotelName);
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        // Add payment processing logic here if needed
        setBookedHotel(selectedHotel);
        setSelectedHotel(null);
    };

    return (
        <div>
            {!hotels.length > 0 && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nereye gideceksiniz?</label>
                        <select 
                            value={destination} 
                            onChange={(e) => setDestination(e.target.value)} 
                            required
                        >
                            <option value="" disabled>İl seçin</option>
                            {provinces.map(province => (
                                <option key={province} value={province}>{province}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Ne zaman gideceksiniz?</label>
                        <input
                            type="date"
                            value={checkInDate}
                            onChange={(e) => setCheckInDate(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Ne kadar kalacaksınız? (Çıkış tarihi)</label>
                        <input
                            type="date"
                            value={checkOutDate}
                            onChange={(e) => setCheckOutDate(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Rezervasyon Yap</button>
                </form>
            )}
            <div>
                {hotels.length > 0 && !selectedHotel && (
                    <div>
                        <h2>{destination} Otelleri</h2>
                        <ul>
                            {hotels.map((hotel, index) => (
                                <li key={index}>
                                    <h3>{hotel.name}</h3>
                                    <button 
                                        onClick={() => handleBookHotel(hotel.name)}
                                        disabled={bookedHotel === hotel.name}
                                        style={{
                                            backgroundColor: bookedHotel === hotel.name ? 'green' : '',
                                            color: bookedHotel === hotel.name ? 'white' : ''
                                        }}
                                    >
                                        {bookedHotel === hotel.name ? 'Rezervasyon Tamamlandı' : 'Rezervasyonu Tamamla'}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {selectedHotel && (
                    <form onSubmit={handlePaymentSubmit}>
                        <h2>Ödeme Bilgileri</h2>
                        <div>
                            <label>Kart Numarası</label>
                            <input 
                                type="text" 
                                value={paymentInfo.cardNumber}
                                onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label>Son Kullanma Tarihi</label>
                            <input 
                                type="text" 
                                value={paymentInfo.expiryDate}
                                onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label>CVV</label>
                            <input 
                                type="text" 
                                value={paymentInfo.cvv}
                                onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit">Ödeme Yap</button>
                    </form>
                )}
                {bookedHotel && (
                    <p>Rezervasyonunuz başarıyla alınmıştır: {bookedHotel}</p>
                )}
            </div>
        </div>
    );
};

export default BookingForm;
