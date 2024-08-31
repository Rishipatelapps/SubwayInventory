import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Send } from 'lucide-react';

const categories = [
  { name: 'Veggies', items: ['Avocado, Pulp Fzn', 'Cucumber 24 Ct Subway', 'Lettuce Shredded 1/4" Subway', 'Org Olive, Ripe Slcd Shlf Stabl', 'Onion, Red Jumbo', 'Pepper, Bana Mild Slcd In', 'Pepper, Jalapeno Slcd In Brine', 'Pickle, Dill Cc Chip Shlf', 'Spinach Baby Subway', 'Subway Med Green Pepper', 'Tomato, Red Whl Fresh Ref Bulk'] },
  { name: 'Proteins', items: ['Bacon, Pork 150 Ct Slcd Hckry', 'Beef Sub, Pty Burgr Meatl', 'Chicken, Strip Brst Meat Ckd', 'Egg, Pty Scrmb Pln 3.5" Ntrl', 'Ham Log 16.5-22.5# Per Case', 'Meatball, Bf Pork Sesd Ckd Fzn', 'Pepperoni, Pork Bf Stick 3" Lb', 'Roast Beef, Cho Angs Ckd', 'Salami, Genoa Pork Bf Log 2.8', 'Tuna, Light Chnk In Water', 'Turkey, Brst RI Ckd Ovn Rstd'] },
  { name: 'Cheese', items: ['Cheese, Amer Wht Slcd Trgle', 'Cheese, Chedr Mtry Jk Blnd', 'Cheese, Mozz Log V/Pk Ref', 'Cheese, Parm Grtd Shkr Ref', 'Cheese, Ppr Jk Slcd . 25 Z Box', 'Cheese, Prov Slcd Twin Pk Ref', 'Cheese, Swis Slcd Trgle .5 Z'] },
  { name: 'Sauces and Dressings', items: ['Aioli Grlc Rstd Liq', 'Bbq Pouch Shlf Sta', 'Chili Srich Crmy Pouch', 'Chs Chedr Pouch Fzn', 'Mnara Tmto Pouch', 'Stk A-1 Plst Jug Shlf', 'Tyki Swt Onion Pouch', 'Baja Chptle Suthwst', 'Seasoning Salt', 'Parm Oreg Brd Tpng'] },
  { name: 'Toppings', items: ['Clarified Butter', 'Crouton, ItIn Sesd Ss Pkt', 'Dressing, Itln Ft/Fr Ss Pouch', 'Dressing, Ranch Ft/Fr Ss Pouch', 'Dressing, Vngrt Parm Shlf', 'Juice, Lmn Ss Pouch', 'Ketchup, Tmto Fcy 33% Ss Foil', 'Margarine, Spred Whpd 600 Ct', 'Mayonnaise, Pouch Shlf Stabl', 'Mustard, Hony Pouch Shlf Stabl', 'Mustard, Ylw Pouch Shlf Stabl', 'Oil, Veg Oliv Ex Vrgn 90/10'] },
  { name: 'Non-Food Items', items: ['Fork Polyp Wrpd Subway', 'Knife Plyst Wrpd Subway', 'Tong, Srvg 7" Plyst BIk', 'Tape, Thrml Cash Rgstr Wht R', 'Tissue, TIt Jr Jmb RI', 'Towel, Multifold Natural 1 Ply', 'Towel, Papr 10"X800\' N-Perf RL', 'Towel, Roll Natural 1 Ply 600\'', 'Tray, Pprbd Toppings Spcl', 'Bag, 3.5 Gal Plst Urn Liner', 'Baking Paper 11.25X16.25', 'Carton, Pprbd Catrg Box Spcl', 'Carton, Pprbd Spcl Print To-Go', 'Film, 12"X2000\' Plst Cttr Box', 'Film, 18"X2000\' Plst Cttr Box', 'Glove, Poly Lg Clr Ambdx', 'Glove, Poly Med Clr Ambdx', 'Glove, Poly Sm Clr Ambdx', 'Glove, Poly XI Clr Ambdx', 'Label, 2.5" Perm 1250 RI Spcl'] },
];

const InventoryItem = ({ item, onUpdateQuantity }) => {
  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10) || 0;
    setQuantity(newQuantity);
    onUpdateQuantity(item, newQuantity);
  };

  return (
    <div className="flex items-center justify-between py-2 border-b">
      <span className="flex-grow">{item}</span>
      <input
        type="number"
        min="0"
        value={quantity}
        onChange={handleQuantityChange}
        name={`inventory[${item}]`}
        className="w-20 p-1 text-right border rounded"
      />
    </div>
  );
};

const CategorySection = ({ category, items, onUpdateQuantity }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        type="button"
        className="flex items-center justify-between w-full py-2 px-4 bg-gray-200 rounded-lg focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold">{category}</span>
        {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </button>
      {isOpen && (
        <div className="mt-2 p-4 bg-white rounded-lg shadow">
          {items.map((item, index) => (
            <InventoryItem key={index} item={item} onUpdateQuantity={onUpdateQuantity} />
          ))}
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [inventory, setInventory] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdateQuantity = (item, quantity) => {
    setInventory(prev => ({ ...prev, [item]: quantity }));
  };

  const handleSubmit = (e) => {
    setIsSubmitting(true);
    // Form submission is handled by Formspree
    setTimeout(() => {
      setIsSubmitting(false);
      setInventory({});
      alert('Inventory submitted successfully!');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <img src="/api/placeholder/200/100" alt="Subway Logo" className="mx-auto mb-4" />
          <h1 className="text-2xl font-bold">Subway Inventory Management</h1>
        </div>
        
        <form action="https://formspree.io/f/xblrwvqq" method="POST" onSubmit={handleSubmit}>
          <input type="hidden" name="_subject" value="Subway Inventory Submission" />
          
          {categories.map((category, index) => (
            <CategorySection
              key={index}
              category={category.name}
              items={category.items}
              onUpdateQuantity={handleUpdateQuantity}
            />
          ))}
          
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none flex items-center justify-center disabled:bg-gray-400"
            disabled={isSubmitting}
          >
            <Send size={24} className="mr-2" />
            {isSubmitting ? 'Submitting...' : 'Submit Inventory'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
