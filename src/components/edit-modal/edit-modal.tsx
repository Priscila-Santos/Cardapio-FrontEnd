// import { useEffect, useState } from "react";
// import { useFoodDataMutate } from "../../hooks/useFoodDataMutate";
// import { FoodData } from "../../interface/FoodData";

// import "./modal.css";

// interface InputProps {
//     label: string,
//     value: string | number,
//     updateValue(value: unknown): void
// }

// interface ModalProps {
//     closeModal(): void;
//     foodData: FoodData;
// }

// const Input = ({ label, value, updateValue }: InputProps) => {
//     return (
//         <>
//         <label>{label}</label>
//         <input value={value} onChange={event => {
//             const val = event.target.value;
//             if(typeof value === "number") {
//                 updateValue(parseFloat(val));
//             } else {
//                 updateValue(val);
//             }
//         }}
//         />
//         </>
//     )
// }


// export function EditModal({ closeModal, foodData }: ModalProps ) {
//     const [title, setTitle] = useState<string>(foodData.title);
//     const [price, setPrice] = useState<number>(foodData.price);
//     const [image, setImage] = useState<string>(foodData.image);
//     const { editMutation } = useFoodDataMutate();
//     const { mutate, isSuccess, status } = editMutation;

//     const submit = () => {
//         const updateFoodData: FoodData = {
//             ...foodData,
//             title,
//             price,
//             image
//         }
//         mutate(updateFoodData)
//     }

//     useEffect(() => {
//         if(!isSuccess) return
//         closeModal();
        
//     }, [isSuccess, closeModal]);

//     const isLoading = status === 'pending';

//     return (
//         <div className="modal-overlay">
//             <div className="modal-body">
//                 <h2>Edite o cardápio</h2>
//                 <form className="input-container">
//                     <Input label="title" value={title} updateValue={setTitle} />
//                     <Input label="price" value={price} updateValue={setPrice} />
//                     <Input label="image" value={image} updateValue={setImage} />
//                 </form>
//                 <button onClick={submit} className="btn-secondary">
//                     {isLoading ? 'editando...' : 'editar'}
//                 </button>
//             </div>
//         </div>
//     )
// }