import { useContext } from "react";
import { AppContext } from "../Context/index";

function ConfirmationModal({ setShowConfirmationModal }: any) {

    const styles = {
        wrapper: {
            width: "90%",
            maxWidth: "400px",
            padding: "0 1rem",
            boxSizing: "border-box" as "border-box",
        },
        content: {
            backgroundColor: "#ffffff",
            padding: "2rem",
            borderRadius: "0.75rem",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column" as "column",
            textAlign: "center" as "center",
        },
        title: {
            fontSize: "1.125rem",
            fontWeight: 600,
            color: "#111827",
            marginBottom: "1.5rem",
        },
        actions: {
            display: "flex",
            gap: "1rem",
            flexDirection: "column" as "column",
        },
        confirmButton: {
            padding: "0.625rem 1.25rem",
            fontSize: "0.875rem",
            fontWeight: 500,
            borderRadius: "0.5rem",
            border: "none",
            backgroundColor: "#3b82f6",
            color: "#ffffff",
            cursor: "pointer",
            transition: "background-color 0.2s",
        },
        cancelButton: {
            padding: "0.625rem 1.25rem",
            fontSize: "0.875rem",
            fontWeight: 500,
            borderRadius: "0.5rem",
            border: "1px solid #e5e7eb",
            backgroundColor: "#ffffff",
            color: "#6b7280",
            cursor: "pointer",
            transition: "background-color 0.2s, color 0.2s",
        },
    };

    interface AppContextType {
        markTaskAsCompleted: () => void
    }

    const { markTaskAsCompleted } = useContext<AppContextType>(AppContext);

    function handleCancelClick(): void {
        setShowConfirmationModal(false)
    }

    function handleClick(): void {
        markTaskAsCompleted()
        setShowConfirmationModal(false)
    }

    return (

        <div style={styles.wrapper}>
            <div style={styles.content}>
                <h3 style={styles.title}>Are you sure you want to mark this task as completed?</h3>
                <div style={styles.actions}>
                    <button onClick={handleClick} style={styles.confirmButton}>Confirm</button>
                    <button onClick={handleCancelClick} style={styles.cancelButton}>Cancel</button>
                </div>
            </div>
        </div>

    );
}


export default ConfirmationModal
