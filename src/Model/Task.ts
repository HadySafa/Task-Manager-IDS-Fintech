export interface Task {
    id: number,
    name: string;        
    status: "completed" | "incompleted"; 
    priority: "low" | "medium" | "high";       
    createdAt: Date;         
    deadline: Date;          
}
