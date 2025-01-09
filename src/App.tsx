import { useState } from 'react';
import './App.css';
import { Card } from './components/card/card';
import { useFoodData } from './hooks/useFoodData';
import { CreateModal } from './components/create-modal/create-modal';
import { FoodData } from './interface/FoodData';

function App() {
  const { data } = useFoodData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodData | null>(null);

  const handleOpenModal = (foodData?: FoodData) => {
    setSelectedFood(foodData || null);
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFood(null);
  }

  return (
      <div className="container">
        <h1>Cardápio</h1>
        <div className="card-grid">
          {data?.map(foodData => 
          <Card 
          key={foodData.id}
          price={foodData.price} 
          title={foodData.title} 
          image={foodData.image} 
          onClick={() => handleOpenModal(foodData)} 
          />
          )}
        </div>
        {isModalOpen && <CreateModal closeModal={handleCloseModal} foodData={selectedFood} />}
        <button onClick={() => handleOpenModal()}>novo</button>
      </div>
  )
}

export default App;
