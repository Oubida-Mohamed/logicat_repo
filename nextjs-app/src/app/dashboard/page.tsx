"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "@/utils/cookies";
import { useUser } from "@/hooks/useUser";

interface Task {
  id: number;
  task: string;
  status?: string;
  created_at: string;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isClient, setIsClient] = useState<boolean>(false);

  const user = useUser();

  // console.log(tasks[0]->created_at)
  
  // États pour les filtres et recherche
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  const [formData, setFormData] = useState({
    task: "",
  });

  // Set isClient to true when component mounts on client
  useEffect(() => {
    setIsClient(true);
    fetchTasks();
  }, [formData]);

  // Appliquer les filtres et recherche quand les données ou les filtres changent
  useEffect(() => {
    applyFilters();
  }, [tasks, searchTerm, statusFilter]);

  const applyFilters = () => {
    // Ensure tasks is always treated as an array
    const tasksArray = Array.isArray(tasks) ? tasks : [];
    
    let filtered = tasksArray;

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.task.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par statut
    if (statusFilter !== "all") {
      filtered = filtered.filter(task => task.status === statusFilter);
    }

    setFilteredTasks(filtered);
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://127.0.0.1:8000/api/tasks', {
        headers: {
          Authorization: `Bearer ${getCookie("TOKEN")}`,
        },
      });
      
      // Handle different response structures
      let tasksData = response.data;
      
      // If response.data is an object with a data property
      if (tasksData && typeof tasksData === 'object' && tasksData.data) {
        tasksData = tasksData.data;
      }
      
      // If response.data is an object with a tasks property
      if (tasksData && typeof tasksData === 'object' && tasksData.tasks) {
        tasksData = tasksData.tasks;
      }
      
      // Ensure we always set an array
      if (Array.isArray(tasksData)) {
        setTasks(tasksData);
      } else {
        console.error('Expected array but got:', tasksData);
        setTasks([]);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingTask) {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/update_task/${editingTask.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${getCookie("TOKEN")}`,
            },
          }
        );
        
        setTasks(tasks.map(task => 
          task.id === editingTask.id ? response.data : task
        ));
      } else {
        if(user.user && !user.loading) {
          const response = await axios.post(
            `http://127.0.0.1:8000/api/add_task/${user.user.id}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${getCookie("TOKEN")}`,
              },
            }
          );
        
          setTasks(prevTasks => [...prevTasks, response.data]);
        }
        
      }
      
      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving task:", error);
      resetForm();
      setShowModal(false);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setFormData({
      task: task.task,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/delete_task/${id}`, {
          headers: {
            Authorization: `Bearer ${getCookie("TOKEN")}`,
          },
        });
        
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      } catch (error) {
        console.error("Error deleting task:", error);
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      }
    }
  };

  const handleStatusChange = async (taskId: number, newStatus: string) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/mark_as_terminate/${taskId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${getCookie("TOKEN")}`,
          },
        }
      );
      
      setTasks(prevTasks => prevTasks.map(task => 
        task.id === taskId ? response.data : task
      ));

      fetchTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      task: "",
    });
    setEditingTask(null);
  };

  const handleLogout = () => {
    document.cookie = "TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login";
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "termine":
        return { text: "Terminé", color: "bg-green-100 text-green-800" };
      case "en_cours":
        return { text: "En cours", color: "bg-blue-100 text-blue-800" };
      default:
        return { text: status, color: "bg-gray-100 text-gray-800" };
    }
  };

  // Safe array access for statistics
  const tasksArray = Array.isArray(tasks) ? tasks : [];
  const completedTasks = tasksArray.filter(task => task.status === "termine").length;
  const inProgressTasks = tasksArray.filter(task => task.status === "en_cours").length;

  // Prevent rendering until client-side to avoid hydration mismatch
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">Tableau de Bord des Tâches</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{!user.loading ? `Bienvenue ${user.user?.name}!` : ""}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Total des Tâches</h3>
                <p className="text-2xl font-semibold text-gray-900">{tasksArray.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Tâches Terminées</h3>
                <p className="text-2xl font-semibold text-gray-900">
                  {completedTasks}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">En Cours</h3>
                <p className="text-2xl font-semibold text-gray-900">
                  {inProgressTasks}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtres et Recherche */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Recherche par mot-clé */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recherche
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher une tâche..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Filtre par statut */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Statut
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tous les statuts</option>
                <option value="termine">Terminé</option>
                <option value="en_cours">En cours</option>
              </select>
            </div>

            {/* Bouton clear filters */}
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Effacer les filtres
              </button>
            </div>
          </div>
        </div>

        {/* Taches Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Gestion des Tâches</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {filteredTasks.length} tâche(s) trouvée(s)
                  {filteredTasks.length !== tasksArray.length && ` sur ${tasksArray.length} au total`}
                </p>
              </div>
              <button
                onClick={() => {
                  resetForm();
                  setShowModal(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Ajouter Tâche
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune tâche trouvée</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Essayez de modifier vos critères de recherche ou de filtres.
                </p>
                <div className="mt-6">
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Effacer les filtres
                  </button>
                </div>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tâche
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date de création
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTasks.map((task, index) => {
                    const statusInfo = getStatusInfo(task.status || "en_cours");
                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{task.task}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={task.status}
                            onChange={(e) => handleStatusChange(task.id, e.target.value)}
                            className={`text-xs font-semibold rounded-full px-3 py-1 border-0 focus:ring-2 focus:ring-blue-500 ${statusInfo.color}`}
                          >
                            <option value="en_cours">En cours</option>
                            <option value="termine">Terminé</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(task.created_at).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(task)}
                              className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded text-sm font-medium"
                            >
                              Modifier
                            </button>
                            <button
                              onClick={() => handleDelete(task.id)}
                              className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded text-sm font-medium"
                            >
                              Supprimer
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>

      {/* Add/Edit Tache Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingTask ? 'Modifier la Tâche' : 'Ajouter une Nouvelle Tâche'}
              </h3>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tâche
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.task}
                      onChange={(e) => setFormData({ ...formData, task: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Entrez la description de la tâche"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                  >
                    {editingTask ? 'Mettre à jour' : 'Créer'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}