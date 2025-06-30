    // frontend/src/pages/admin/ManageUsersPage.jsx

    import { useEffect, useState } from 'react';
    import api from '../../services/api';
    import Spinner from '../../components/common/Spinner';
    import Button from '../../components/common/Button';
    import Modal from '../../components/common/Modal';
    import Input from '../../components/common/Input';
    import { toast } from 'react-hot-toast'; // Ensure this is imported

    // SVG Icons
    // ... (SVG Icons for Users, Book, CheckSquare, UserCheck - same as AdminDashboardPage)

    // *** Yahan component ka naam ManageUsersPage hona chahiye ***
    const ManageUsersPage = () => { // <-- Ensure this name matches the file and export
      const [users, setUsers] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [currentUser, setCurrentUser] = useState(null);
      const [selectedRole, setSelectedRole] = useState('');

      const fetchUsers = async () => {
        try {
          const response = await api.get('/admin/users');
          setUsers(response.data);
        } catch (err) {
          setError('Failed to fetch users.');
          console.error('Error fetching users:', err);
          toast.error('Failed to load users.');
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchUsers();
      }, []);

      const handleEditClick = (user) => {
        setCurrentUser(user);
        setSelectedRole(user.role);
        setIsModalOpen(true);
      };

      const handleRoleUpdate = async () => {
        if (!currentUser || !selectedRole) return;
        try {
          await api.put(`/admin/users/${currentUser._id}`, { role: selectedRole });
          toast.success('User role updated successfully!');
          setIsModalOpen(false);
          fetchUsers(); // Refresh the user list
        } catch (err) {
          toast.error('Failed to update user role.');
          console.error('Error updating user role:', err);
        }
      };

      const handleDeleteClick = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
          try {
            await api.delete(`/admin/users/${userId}`);
            toast.success('User deleted successfully!');
            fetchUsers(); // Refresh the user list
          } catch (err) {
            toast.error('Failed to delete user.');
            console.error('Error deleting user:', err);
          }
        }
      };

      if (loading) return <div className="flex justify-center items-center h-64"><Spinner size="lg" /></div>;
      if (error) return <div className="text-center text-accent text-lg">{error}</div>;
      if (users.length === 0) return <div className="text-center text-body text-lg">No users found.</div>;

      return (
        <div className="p-6">
          <h2 className="text-3xl font-extrabold text-heading mb-8">Manage Users</h2>
          <div className="bg-surface rounded-lg shadow-medium overflow-hidden">
            <table className="min-w-full divide-y divide-border-light">
              <thead className="bg-primary-lightest">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-surface divide-y divide-border-light">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-body">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-body">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'Admin' ? 'bg-accent/10 text-accent' :
                        user.role === 'Instructor' ? 'bg-secondary/10 text-secondary' :
                        'bg-primary/10 text-primary'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-body">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button variant="ghost" onClick={() => handleEditClick(user)} className="text-primary hover:text-primary-dark mr-2">
                        Edit
                      </Button>
                      <Button variant="danger" onClick={() => handleDeleteClick(user._id)} className="hover:bg-red-600">
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Edit User Role Modal */}
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Edit User Role">
            {currentUser && (
              <div className="space-y-4">
                <p className="text-body">Editing role for: <span className="font-semibold text-heading">{currentUser.name} ({currentUser.email})</span></p>
                <div>
                  <label htmlFor="role-select" className="block text-sm font-medium text-heading mb-1">Select New Role</label>
                  <select
                    id="role-select"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="mt-1 block w-full rounded-lg border-border-light shadow-soft focus:border-primary focus:ring-primary sm:text-base px-4 py-2.5 transition-all duration-200 text-heading"
                  >
                    <option value="Student">Student</option>
                    <option value="Instructor">Instructor</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button variant="primary" onClick={handleRoleUpdate}>Update Role</Button>
                </div>
              </div>
            )}
          </Modal>
        </div>
      );
    };

    // *** Yahan export default ka naam file ke naam se match hona chahiye ***
    export default ManageUsersPage; // <-- Ensure this matches the component name above
    