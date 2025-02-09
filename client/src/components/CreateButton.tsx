import React from 'react';

interface CreateButtonProps {
    onClick?: () => void;
    label?: string;
}

const CreateButton: React.FC<CreateButtonProps> = ({ onClick, label = "Create" }) => {
    return (
        <button 
                type='submit'
                onClick={onClick}
                className="p-2 bg-teal-600 rounded hover:bg-teal-500 cursor-pointer">
                {label}
        </button>
    );
}

export default CreateButton;