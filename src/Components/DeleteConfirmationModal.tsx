import { useContext } from "react";
import { AppContext } from "../Context/index";

function DeleteConfirmationModal({ setShowDeleteConfirmationModal }: any) {

    interface AppContextType {
        removeTask: () => void;
    }

    const { removeTask } = useContext<AppContextType>(AppContext);


    function hideDeleteModal(): void {
        setShowDeleteConfirmationModal(false);
    }

    function handleDelete(): void {
        removeTask()
        hideDeleteModal();
    }

    const styles = {
        modalContent: {
            backgroundColor: "#ffffff",
            padding: "2rem",
            borderRadius: "0.75rem",
            textAlign: "center" as "center",
            position: "relative" as "relative",
            width: "90%",
            maxWidth: "400px",
            margin: "2rem auto",
            boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
            boxSizing: "border-box" as "border-box",
        },
        icon: {
            width: "3rem",
            height: "3rem",
            margin: "0 auto 1rem",
            color: "#6B7280",
        },
        message: {
            marginBottom: "1.5rem",
            fontSize: "1rem",
            color: "#374151",
        },
        buttonGroup: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap" as "wrap",
        },
        cancelButton: {
            padding: "0.625rem 1.25rem",
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#6B7280",
            backgroundColor: "#ffffff",
            border: "1px solid #D1D5DB",
            borderRadius: "0.5rem",
            cursor: "pointer",
            transition: "background-color 0.2s, color 0.2s",
        },
        confirmButton: {
            padding: "0.625rem 1.25rem",
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#ffffff",
            backgroundColor: "#DC2626",
            borderRadius: "0.5rem",
            cursor: "pointer",
            border: "none",
            transition: "background-color 0.2s",
        },
    };

    return (

        <div style={styles.modalContent}>
            <svg
                style={styles.icon}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                ></path>
            </svg>

            <p style={styles.message}>Are you sure you want to delete this task?</p>

            <div style={styles.buttonGroup}>
                <button style={styles.cancelButton} onClick={hideDeleteModal}>
                    No, cancel
                </button>
                <button style={styles.confirmButton} onClick={handleDelete}>
                    Yes, I'm sure
                </button>
            </div>
        </div>

    );
}

export default DeleteConfirmationModal;
