import { useEffect, useState } from "react";
import { useFoodDataMutate } from "../../hooks/useFoodDataMutate";
import { FoodData } from "../../interface/FoodData";

import "./modal.css";

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: unknown): void
}

interface ModalProps {
    closeModal(): void;
    foodData?: FoodData | null; // foodData é opcional
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
        <label>{label}</label>
        <input value={value} onChange={event => {
            const val = event.target.value;
            if (typeof value === "number") {
                updateValue(parseFloat(val));
            } else {
                updateValue(val);
            }
        }} />
        </>
    )
}

export function CreateModal({ closeModal, foodData }: ModalProps) {
    const [title, setTitle] = useState<string>(foodData?.title || "");
    const [price, setPrice] = useState<number>(foodData?.price || 0);
    const [image, setImage] = useState<string>(foodData?.image || "");
    const { createMutation, editMutation } = useFoodDataMutate();
    const { mutate: createMutate, status: createStatus, isSuccess: createSuccess } = createMutation;
    const { mutate: editMutate, status: editStatus, isSuccess: editSuccess } = editMutation;

    const isEditing = !!foodData;
    const isLoading = isEditing ? editStatus === 'pending' : createStatus === 'pending';

    const submit = () => {
        const newFoodData: FoodData = {
            id: foodData?.id || 0,
            title,
            price,
            image
        }

        if (isEditing) {
            editMutate(newFoodData);
        } else {
            createMutate(newFoodData);
        }
    }

    useEffect(() => {
        if (isEditing && editSuccess) {
            closeModal();
        } else if (!isEditing && createSuccess) {
            closeModal();
        }
    }, [isEditing, editSuccess, createSuccess, closeModal]);

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>{isEditing ? "Edite o cardápio" : "Cadastre um novo cardápio"}</h2>
                <form className="input-container">
                    <Input label="title" value={title} updateValue={setTitle} />
                    <Input label="price" value={price} updateValue={setPrice} />
                    <Input label="image" value={image} updateValue={setImage} />
                </form>
                <button onClick={submit} className="btn-secondary">
                    {isLoading ? (isEditing ? 'editando...' : 'postando...') : (isEditing ? 'editar' : 'postar')}
                </button>
            </div>
        </div>
    )
}
