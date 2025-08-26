import type { Task } from "../Model/Task";
import { useContext } from "react";
import { AppContext } from "../Context/index"

function CreateTask({ setShowCreateModal }: any) {

    interface AppContextType {
        addTask: (task: Task) => void;
    };

    const { addTask } = useContext<AppContextType>(AppContext);

    function hideCreateModal(): void {
        setShowCreateModal(false);
    }

    function handleFormSubmission(e: any): void {

        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        if (!formData.get("name") || !formData.get("deadline") || !formData.get("priority")) return

        const newTask: Task = {
            id: -1,
            name: formData.get("name")!.toString(),
            status: "incompleted",
            priority: formData.get("priority")! as "low" | "medium" | "high",
            createdAt: new Date(),
            deadline: new Date(formData.get("deadline")!.toString())
        }

        addTask(newTask)

        hideCreateModal()

    }

    const styles = {
        modalContent: {
            backgroundColor: "#ffffff",
            padding: "2rem",
            borderRadius: "0.75rem",
            width: "90%",
            maxWidth: "500px",
            margin: "2rem auto",
            boxSizing: "border-box" as "border-box",
            boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        },
        modalHeader: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
            borderBottom: "1px solid #e5e7eb",
            paddingBottom: "0.5rem",
        },
        title: {
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "#111827",
        },
        closeButton: {
            background: "transparent",
            border: "none",
            fontSize: "1.25rem",
            cursor: "pointer",
            color: "#6b7280",
            transition: "color 0.2s",
        },
        formFlex: {
            display: "flex",
            flexDirection: "column" as "column",
            gap: "1rem",
        },
        formItem: {
            display: "flex",
            flexDirection: "column" as "column",
        },
        label: {
            marginBottom: "0.5rem",
            fontWeight: 500,
            color: "#374151",
        },
        input: {
            padding: "0.5rem 0.75rem",
            border: "1px solid #d1d5db",
            borderRadius: "0.5rem",
            fontSize: "1rem",
            outline: "none",
            transition: "border-color 0.2s, box-shadow 0.2s",
        },
        submitButton: {
            width: "100%",
            backgroundColor: "#1D4ED8",
            color: "#ffffff",
            padding: "0.625rem 1.25rem",
            border: "none",
            borderRadius: "0.5rem",
            fontSize: "1rem",
            fontWeight: 500,
            cursor: "pointer",
            transition: "background-color 0.2s",
            marginTop: "2rem",
        },
    };

    return (

        <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
                <h3 style={styles.title}>Add New Task</h3>
                <button type="button" style={styles.closeButton} onClick={hideCreateModal}>✕</button>
            </div>

            <form onSubmit={handleFormSubmission}>
                <div style={styles.formFlex}>
                    <div style={styles.formItem}>
                        <label style={styles.label} htmlFor="name">Task</label>
                        <input type="text" id="name" name="name" placeholder="Type task" required style={styles.input} />
                    </div>

                    <div style={styles.formItem}>
                        <label style={styles.label} htmlFor="deadline">Deadline</label>
                        <input type="date" id="deadline" name="deadline" style={styles.input} />
                    </div>

                    <div style={styles.formItem}>
                        <label style={styles.label} htmlFor="priority">Priority</label>
                        <select id="priority" name="priority" style={styles.input}>
                            <option value="">Select priority</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                </div>

                <button type="submit" style={styles.submitButton}>Add</button>
            </form>
        </div>

    );

};

export default CreateTask;
