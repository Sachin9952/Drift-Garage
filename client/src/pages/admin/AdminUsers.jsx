import React, { useState, useEffect } from 'react';
import API from '../../api/axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/admin/users');
      setUsers(data);
      setError(null);
    } catch (err) {
      setError('System Failure: Unable to fetch personnel data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to terminate this operator account?')) {
      try {
        await API.delete(`/admin/users/${id}`);
        fetchUsers();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to terminate operator session.');
      }
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 bg-background">
        <div className="w-14 h-14 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Scanning Personnel Registry...</p>
    </div>
  );

  return (
    <div className="space-y-12 animate-fade-in-up bg-background">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-10">
        <div>
            <h2 className="text-4xl font-black text-on-background italic tracking-tighter brand-logo mb-3 uppercase leading-none">Personnel Directory</h2>
            <p className="text-on-surface-variant font-medium text-lg">Managing verified operators and commissioned personnel clearance.</p>
        </div>
        <div className="flex items-center gap-6 bg-surface-container border border-outline-variant rounded-2xl px-10 py-5 shadow-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(74,124,89,0.4)]"></div>
          <span className="text-[10px] font-black text-on-surface uppercase tracking-[0.4em] font-label">{users.length} Active Accounts</span>
        </div>
      </div>

      {error ? (
        <div className="bg-error-container/10 border border-error/20 p-12 rounded-[48px] text-error text-center font-black uppercase text-[11px] tracking-[0.4em] font-headline italic">{error}</div>
      ) : (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-[48px] overflow-hidden shadow-sm relative">
          <div className="overflow-x-auto w-full relative z-10">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container border-b border-outline-variant/30">
                  <th className="p-10 pl-12 text-[10px] font-black text-on-background uppercase tracking-[0.4em] font-label">Personnel Identity</th>
                  <th className="p-10 text-[10px] font-black text-on-background uppercase tracking-[0.4em] font-label">Comm Channel</th>
                  <th className="p-10 text-[10px] font-black text-on-background uppercase tracking-[0.4em] font-label">Security Clearance</th>
                  <th className="p-10 text-[10px] font-black text-on-background uppercase tracking-[0.4em] font-label">Commission Date</th>
                  <th className="p-10 text-right pr-12 text-[10px] font-black text-on-background uppercase tracking-[0.4em] font-label">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-primary/5 transition-all group">
                    <td className="p-10 pl-12">
                      <div className="flex items-center gap-8">
                        <div className="w-16 h-16 rounded-2xl bg-surface-container border border-outline-variant flex items-center justify-center text-on-surface-variant/40 group-hover:text-primary group-hover:bg-white group-hover:border-primary-container transition-all shadow-sm">
                          <span className="material-symbols-outlined text-[28px]">person_filled</span>
                        </div>
                        <span className="text-xl font-black text-on-background italic tracking-tight uppercase group-hover:text-primary transition-colors font-headline leading-tight">{user.name}</span>
                      </div>
                    </td>
                    <td className="p-10 font-mono text-sm text-on-surface-variant/70 lowercase tracking-tight group-hover:text-on-background transition-colors">{user.email}</td>
                    <td className="p-10">
                      <span className={`px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-[0.3em] border font-label ${
                        user.role === 'admin' 
                          ? 'bg-primary/10 text-primary border-primary-container shadow-sm' 
                          : 'bg-surface-container text-on-surface-variant border-outline-variant'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-10 font-mono text-[11px] text-on-surface-variant/40 uppercase tracking-tighter">
                      {new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }).toUpperCase()}
                    </td>
                    <td className="p-10 pr-12 text-right">
                      <button 
                        onClick={() => handleDelete(user._id)}
                        disabled={user.role === 'admin'}
                        className={`w-14 h-14 rounded-2xl transition-all flex items-center justify-center ml-auto shadow-sm ${
                          user.role === 'admin' 
                            ? 'opacity-20 cursor-not-allowed bg-surface-container text-on-surface-variant/20 border border-outline-variant' 
                            : 'bg-surface-container border border-outline-variant text-on-surface-variant hover:text-error hover:bg-error-container/10 hover:border-error/30'
                        }`}
                        title={user.role === 'admin' ? 'Admin accounts are secure' : 'Terminate account'}
                      >
                        <span className="material-symbols-outlined text-[24px]">{user.role === 'admin' ? 'lock' : 'person_remove'}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
