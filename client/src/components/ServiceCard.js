function ServiceCard({ name, description, price }) {
  return (
    <div className="border p-4 rounded shadow bg-white">
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-gray-700">{description}</p>
      <p className="text-green-700 mt-2 font-semibold">${price}</p>
    </div>
  );
}

export default ServiceCard;
