import { useState } from "react";
import CreateTask from "./CreateTask";
import ConfirmationModal from "./ConfirmationModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { useContext } from "react";
import { AppContext } from "../Context/index"
import type { Task } from "../Model/Task";
import EditTask from "./EditTask";

function TasksTable() {

    interface AppContextType {
        tasks: Task[];
        getCompletedTasks: () => Task[];
        getInCompletedTasks: () => Task[];
        setSelectedTaskToEdit: (task: Task) => void;
        setSelectedTaskToDelete: (task: Task) => void;
        setSelectedTaskToMarkAsComplete: (task: Task) => void;
    };

    const { tasks, getCompletedTasks, getInCompletedTasks, setSelectedTaskToEdit, setSelectedTaskToDelete, setSelectedTaskToMarkAsComplete } = useContext<AppContextType>(AppContext);

    const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
    const [showEditModal, setShowEditModal] = useState<boolean>(false)
    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false)
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState<boolean>(false)


    function handleAddNewTask(): void {
        setShowCreateModal(true)
    }

    function handleMarkAsComplete(task: Task): void {
        setShowConfirmationModal(true)
        setSelectedTaskToMarkAsComplete(task)
    }

    function handleUpdateTask(task: Task): void {
        setShowEditModal(true)
        setSelectedTaskToEdit(task)
    }

    function handleDeleteTask(task: Task): void {
        setShowDeleteConfirmationModal(true)
        setSelectedTaskToDelete(task)
    }

    const [filter, setFilter] = useState<string>("all");
    function handleFilterChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setFilter(e.target.value);
    }

    const filteredTasks =
        filter === "all" ? tasks :
            filter === "incomplete" ? getInCompletedTasks() :
                getCompletedTasks();

    const styles = {
        section: {
            backgroundColor: "inherit",
            padding: "1rem 0",
        },
        container: {
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 1.5rem",
        },
        tableWrapper: {
            overflowX: "auto",
        },
        tableCard: {
            backgroundColor: "#ffffff",
            borderRadius: "0.75rem",
            boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
            padding: "1rem",
        },
        table: {
            width: "100%",
            borderCollapse: "collapse" as "collapse",
            fontSize: "0.875rem",
            textAlign: "left" as "left",
            color: "#6B7280",
        },
        th: {
            padding: "0.75rem 1rem",
            textTransform: "uppercase" as "uppercase",
            fontSize: "0.75rem",
            fontWeight: 700,
            backgroundColor: "#F3F4F6",
            color: "#374151",
            whiteSpace: "nowrap" as "nowrap",
        },
        td: {
            padding: "0.75rem 1rem",
            fontWeight: 500,
            color: "#111827",
            whiteSpace: "nowrap" as "nowrap",
            verticalAlign: "middle",
        },
        trRow: {
            borderBottom: "1px solid #E5E7EB",
            transition: "background-color 0.2s",
        },
        trRowHover: {
            backgroundColor: "#F9FAFB",
        },
        headerFlex: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
            flexWrap: "wrap" as "wrap",
        },
        headerRight: {
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap" as "wrap",
        },
        select: {
            padding: "0.5rem",
            fontSize: "0.875rem",
            border: "1px solid #D1D5DB",
            borderRadius: "0.5rem",
            backgroundColor: "#F9FAFB",
            color: "#111827",
        },
        addButton: {
            padding: "0.5rem 1rem",
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#ffffff",
            backgroundColor: "#1D4ED8",
            borderRadius: "0.5rem",
            cursor: "pointer",
            border: "none",
        },
        actionButton: {
            padding: "0.5rem",
            borderRadius: "0.5rem",
            cursor: "pointer",
            backgroundColor: "#F3F4F6",
            color: "#374151",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        markCompleteButton: {
            padding: "0.5rem 1rem",
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#ffffff",
            backgroundColor: "#1D4ED8",
            borderRadius: "0.5rem",
            border: "none",
            cursor: "pointer",
        },
        deleteButton: {
            padding: "0.5rem",
            borderRadius: "0.5rem",
            cursor: "pointer",
            backgroundColor: "#FEE2E2",
            color: "#B91C1C",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        statusBadgeCompleted: {
            backgroundColor: "#DCFCE7",
            color: "#15803D",
            padding: "0.25rem 0.5rem",
            borderRadius: "0.25rem",
            fontSize: "0.75rem",
            fontWeight: 500,
        },
        statusBadgeIncomplete: {
            backgroundColor: "#DBEAFE",
            color: "#1D4ED8",
            padding: "0.25rem 0.5rem",
            borderRadius: "0.25rem",
            fontSize: "0.75rem",
            fontWeight: 500,
        },
        noTasks: {
            textAlign: "center" as "center",
            padding: "2rem",
            fontSize: "1rem",
            color: "#6B7280",
        },
        modalContainer: {
            position: "absolute",
            top: "0", left: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
            minHeight: "100vh",
            maxHeight: "100vh",
            minWidth: "100vw",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            paddingTop: "2rem"
        },
    };


    return (

        <>
            {   // create new task modal
                showCreateModal
                    ? <div style={styles.modalContainer}><CreateTask setShowCreateModal={setShowCreateModal} /></div>
                    : null
            }

            {   // update a task modal
                showEditModal
                    ? <div style={styles.modalContainer}><EditTask setShowEditModal={setShowEditModal} /></div>
                    : null
            }

            {   // mark task as complete modal
                showConfirmationModal
                    ? <div style={styles.modalContainer}><ConfirmationModal setShowConfirmationModal={setShowConfirmationModal} /></div>
                    : null
            }

            {   // delete task modal
                showDeleteConfirmationModal
                    ? <div style={styles.modalContainer}><DeleteConfirmationModal setShowDeleteConfirmationModal={setShowDeleteConfirmationModal} /></div>
                    : null
            }

            <section style={styles.section}>
                <div style={styles.container}>
                    <div style={{ ...styles.tableWrapper, ...styles.tableCard }}>
                        <div style={styles.headerFlex}>
                            <div>
                                <h5>
                                    <span style={{ color: "#6B7280" }}>All Tasks: </span>
                                    <span style={{ color: "#111827" }}>{tasks.length}</span>
                                </h5>
                            </div>
                            <div style={styles.headerRight}>
                                <select style={styles.select} onChange={handleFilterChange}>
                                    <option value="all">All Tasks</option>
                                    <option value="completed">Completed Tasks</option>
                                    <option value="incomplete">Incomplete Tasks</option>
                                </select>
                                <button onClick={handleAddNewTask} style={styles.addButton}>Add new task</button>
                            </div>
                        </div>

                        <div style={styles.tableWrapper}>
                            {filteredTasks && filteredTasks.length > 0 ? (
                                <table style={styles.table}>
                                    <thead>
                                        <tr>
                                            <th style={styles.th}>Task</th>
                                            <th style={styles.th}>Status</th>
                                            <th style={styles.th}>Priority</th>
                                            <th style={styles.th}>Created At</th>
                                            <th style={styles.th}>Deadline</th>
                                            <th style={styles.th}>Mark as complete</th>
                                            <th style={styles.th}>Update</th>
                                            <th style={styles.th}>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredTasks.map((obj) => (
                                            <tr key={obj.id} style={styles.trRow}>
                                                <td style={styles.td}>{obj.name}</td>
                                                <td style={styles.td}>
                                                    <span style={obj.status === "completed" ? styles.statusBadgeCompleted : styles.statusBadgeIncomplete}>
                                                        {obj.status === "completed" ? "Completed" : "Incomplete"}
                                                    </span>
                                                </td>
                                                <td style={styles.td}>{obj.priority}</td>
                                                <td style={styles.td}>{obj.createdAt.toString().split(" ").slice(0, 4).join(" ")}</td>
                                                <td style={styles.td}>{obj.deadline.toString().split(" ").slice(0, 4).join(" ")}</td>
                                                <td>
                                                    <button
                                                        disabled={obj.status === "completed"}
                                                        onClick={() => handleMarkAsComplete(obj)}
                                                        style={styles.markCompleteButton}
                                                    >
                                                        Mark as Complete
                                                    </button>
                                                </td>
                                                <td>
                                                    <button onClick={() => handleUpdateTask(obj)} style={styles.actionButton}>✏️</button>
                                                </td>
                                                <td>
                                                    <button onClick={() => handleDeleteTask(obj)} style={styles.deleteButton}>🗑️</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div style={styles.noTasks}>No available Tasks</div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default TasksTable;
