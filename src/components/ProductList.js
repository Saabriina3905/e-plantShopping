import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../features/CartSlice';
import CartItem from './CartItem'; // IMPORT CARTITEM
import './ProductList.css';

function ProductList() {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.items);
    const [showCart, setShowCart] = useState(false); // STATE TO TOGGLE VIEW

    const plantsArray = [
        {
            category: "Air Purifying",
            plants: [
                { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night.", cost: "$15" },
                { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene.", cost: "$12" }
            ]
        },
       {
    category: "Aromatic",
    plants: [
        { 
            name: "Lavender", 
            image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?q=80&w=1964&auto=format&fit=crop", 
            description: "Calming scent, perfect for bedrooms.", 
            cost: "$20" 
        },
        { 
            name: "Rosemary", 
            image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", 
            description: "Wonderful aroma, used in cooking.", 
            cost: "$15" 
        }
    ]
},
        {
            category: "Low Maintenance",
            plants: [
                { name: "Pothos", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop", description: "Hard to kill, grows quickly.", cost: "$10" },
                { name: "Jade Plant", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?q=80&w=1964&auto=format&fit=crop", description: "Succulent with thick leaves.", cost: "$18" }
            ]
        }
    ];

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
    };

    const isAddedToCart = (plantName) => {
        return cart.some(item => item.name === plantName);
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handleContinueShopping = () => {
        setShowCart(false);
    };

    return (
        <div className="product-grid">
            <nav className="navbar">
                <h1>Paradise Nursery</h1>
                <div className="nav-links">
                    <a href="#" onClick={handleContinueShopping}>Plants</a>
                    <a href="#" className="cart-icon" onClick={handleCartClick}>
                        🛒 <span className="cart-count">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
                    </a>
                </div>
            </nav>

            {/* CONDITIONAL RENDERING: SHOW CART OR PLANT LIST */}
            {showCart ? (
                <CartItem onContinueShopping={handleContinueShopping} />
            ) : (
                <div>
                    {plantsArray.map((category, index) => (
                        <div key={index} className="category-section">
                            <h2 className="category-title">{category.category}</h2>
                            <div className="plant-list">
                                {category.plants.map((plant, idx) => (
                                    <div key={idx} className="plant-card">
                                        <img src={plant.image} alt={plant.name} />
                                        <h3>{plant.name}</h3>
                                        <p>{plant.description}</p>
                                        <p><strong>{plant.cost}</strong></p>
                                        <button 
                                            className={`add-button ${isAddedToCart(plant.name) ? 'disabled' : ''}`}
                                            disabled={isAddedToCart(plant.name)}
                                            onClick={() => handleAddToCart(plant)}
                                        >
                                            {isAddedToCart(plant.name) ? 'Added' : 'Add to Cart'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductList;