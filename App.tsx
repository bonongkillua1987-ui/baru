import React, { useState, useEffect } from 'react';
import { ViewType, Client, Project, TeamMember, Transaction, Package, AddOn, TeamProjectPayment, Profile, FinancialPocket, TeamPaymentRecord, Lead, RewardLedgerEntry, User, Card, Asset, ClientFeedback, Contract, RevisionStatus, NavigationAction, Notification, SocialMediaPost, PromoCode, SOP, CardType, PocketType } from './types';
import { MOCK_USERS, HomeIcon, FolderKanbanIcon, UsersIcon, DollarSignIcon, PlusIcon, lightenColor, darkenColor, hexToHsl } from './constants';
import { AuthService } from './lib/auth';
import { useClients, useProjects, useUsers, useLeads, usePackages, useTeamMembers, useTransactions, useAssets, useContracts, usePromoCodes, useSOPs, useSocialMediaPosts, useAddOns, useFinancialPockets, useCards, useTeamProjectPayments, useNotifications, useProfiles, useClientFeedback } from './hooks/useDatabase';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import { Leads } from './components/Leads';
import Booking from './components/Booking';
import Clients from './components/Clients';
import { Projects } from './components/Projects';
import { Freelancers } from './components/Freelancers';
import Finance from './components/Finance';
import Packages from './components/Packages';
import { Assets } from './components/Assets';
import Settings from './components/Settings';
import { CalendarView } from './components/CalendarView';
import Login from './components/Login';
import PublicBookingForm from './components/PublicBookingForm';
import PublicPackages from './components/PublicPackages';
import PublicFeedbackForm from './components/PublicFeedbackForm';
import PublicRevisionForm from './components/PublicRevisionForm';
import PublicLeadForm from './components/PublicLeadForm';
import Header from './components/Header';
import SuggestionForm from './components/SuggestionForm';
import ClientReports from './components/ClientKPI';
import GlobalSearch from './components/GlobalSearch';
import Contracts from './components/Contracts';
import ClientPortal from './components/ClientPortal';
import FreelancerPortal from './components/FreelancerPortal';
import { SocialPlanner } from './components/SocialPlanner';
import PromoCodes from './components/PromoCodes';
import SOPManagement from './components/SOP';
import Homepage from './components/Homepage';

const AccessDenied: React.FC<{onBackToDashboard: () => void}> = ({ onBackToDashboard }) => (
    <div className="
        flex flex-col items-center justify-center
        h-full
        text-center
        p-4 sm:p-6 md:p-8
        animate-fade-in
    ">
        <div className="
            w-16 h-16 sm:w-20 sm:h-20
            rounded-full
            bg-red-100 dark:bg-red-900/20
            flex items-center justify-center
            mb-4 sm:mb-6
        ">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
        </div>
        <h2 className="
            text-xl sm:text-2xl
            font-bold
            text-red-600 dark:text-red-400
            mb-2 sm:mb-3
        ">
            Akses Ditolak
        </h2>
        <p className="
            text-brand-text-secondary
            mb-6 sm:mb-8
            max-w-md
            leading-relaxed
        ">
            Anda tidak memiliki izin untuk mengakses halaman ini.
        </p>
        <button
            onClick={onBackToDashboard}
            className="button-primary"
        >
            Kembali ke Dashboard
        </button>
    </div>
);

const BottomNavBar: React.FC<{ activeView: ViewType; handleNavigation: (view: ViewType) => void }> = ({ activeView, handleNavigation }) => {
    const navItems = [
        { view: ViewType.DASHBOARD, label: 'Beranda', icon: HomeIcon },
        { view: ViewType.PROJECTS, label: 'Proyek', icon: FolderKanbanIcon },
        { view: ViewType.CLIENTS, label: 'Klien', icon: UsersIcon },
        { view: ViewType.FINANCE, label: 'Keuangan', icon: DollarSignIcon },
    ];

    return (
        <nav className="
            bottom-nav
            xl:hidden
            bg-brand-surface/95
            backdrop-blur-xl
            border-t border-brand-border/50
        ">
            <div className="
                flex justify-around items-center
                h-16
                px-2
            "
            style={{
                paddingBottom: 'var(--safe-area-inset-bottom, 0px)'
            }}>
                {navItems.map(item => (
                    <button
                        key={item.view}
                        onClick={() => handleNavigation(item.view)}
                        className={`
                            flex flex-col items-center justify-center
                            w-full h-full
                            px-2 py-2
                            rounded-xl
                            transition-all duration-200
                            min-w-[64px] min-h-[48px]
                            relative
                            group
                            ${activeView === item.view
                                ? 'text-brand-accent bg-brand-accent/10'
                                : 'text-brand-text-secondary hover:text-brand-text-primary hover:bg-brand-input/50 active:bg-brand-input'
                            }
                        `}
                        aria-label={item.label}
                    >
                        {/* Enhanced Icon */}
                        <div className="
                            relative
                            mb-1
                        ">
                            <item.icon className={`
                                w-5 h-5 sm:w-6 sm:h-6
                                transition-all duration-200
                                ${activeView === item.view ? 'transform scale-110' : 'group-active:scale-95'}
                            `} />

                            {/* Active indicator dot */}
                            {activeView === item.view && (
                                <div className="
                                    absolute -top-1 -right-1
                                    w-2 h-2
                                    bg-brand-accent
                                    rounded-full
                                    animate-pulse-soft
                                " />
                            )}
                        </div>

                        {/* Enhanced Label */}
                        <span className={`
                            text-xs font-semibold
                            leading-tight
                            transition-all duration-200
                            ${activeView === item.view ? 'font-bold' : ''}
                        `}>
                            {item.label}
                        </span>

                        {/* Background highlight */}
                        <div className={`
                            absolute inset-0
                            rounded-xl
                            transition-all duration-300
                            ${activeView === item.view
                                ? 'bg-gradient-to-t from-brand-accent/10 to-transparent'
                                : 'bg-transparent group-hover:bg-brand-input/30'
                            }
                        `} />
                    </button>
                ))}
            </div>
        </nav>
    );
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<ViewType>(ViewType.HOMEPAGE);
  const [notification, setNotification] = useState<string>('');
  const [initialAction, setInitialAction] = useState<NavigationAction | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [route, setRoute] = useState(window.location.hash || '#/home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // --- Database Integration - All data from Supabase ---
  const { clients, loading: clientsLoading, createClient, updateClient, deleteClient } = useClients();
  const { projects, loading: projectsLoading, createProject, updateProject, deleteProject } = useProjects();
  const { users } = useUsers();
  const { leads } = useLeads();
  const { packages } = usePackages();
  const { teamMembers } = useTeamMembers();
  const { transactions } = useTransactions();
  const { assets } = useAssets();
  const { contracts } = useContracts();
  const { promoCodes } = usePromoCodes();
  const { sops } = useSOPs();
  const { socialMediaPosts } = useSocialMediaPosts();
  const { addOns } = useAddOns();
  const { pockets } = useFinancialPockets();
  const { cards } = useCards();
  const { teamProjectPayments } = useTeamProjectPayments();
  const { notifications } = useNotifications();
  const { profiles } = useProfiles();
  const { clientFeedback } = useClientFeedback();

  // Profile state - use first profile from database
  const profile = profiles.length > 0 ? profiles[0] : null;

  // Mock data that's still needed for backward compatibility
  const teamPaymentRecords: TeamPaymentRecord[] = [];
  const rewardLedgerEntries: RewardLedgerEntry[] = [];

    // --- [NEW] MOCK EMAIL SERVICE ---
    const sendEmailNotification = (recipientEmail: string, notification: Notification) => {
        console.log(`
        ========================================
        [SIMULASI EMAIL] Mengirim notifikasi ke: ${recipientEmail}
        ----------------------------------------
        Judul: ${notification.title}
        Pesan: ${notification.message}
        Waktu: ${new Date(notification.timestamp).toLocaleString('id-ID')}
        ========================================
        `);
    };

    // --- [NEW] CENTRALIZED NOTIFICATION HANDLER ---
    const addNotification = (newNotificationData: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => {
        const newNotification: Notification = {
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            isRead: false,
            ...newNotificationData
        };

        // Assuming you have a way to update notifications in Supabase
        // For now, we'll just update local state and log
        console.log("Adding notification:", newNotification);
        // setNotifications(prev => [newNotification, ...prev]); // This would need Supabase integration

        if (profile?.email) {
            sendEmailNotification(profile.email, newNotification);
        } else {
            console.warn('[SIMULASI EMAIL] Gagal: Alamat email vendor tidak diatur di Pengaturan Profil.');
        }
    };

  // --- Auth State Management ---
  useEffect(() => {
    const { data: { subscription } } = AuthService.onAuthStateChange((user) => {
      setIsAuthenticated(!!user);
      if (user) {
        // Convert Supabase user to app User type
        const appUser: User = {
          id: user.id,
          email: user.email || '',
          password: '',
          fullName: user.user_metadata?.full_name || '',
          companyName: user.user_metadata?.company_name,
          role: user.user_metadata?.role || 'Member',
          permissions: user.user_metadata?.permissions
        };
        setCurrentUser(appUser);
      } else {
        setCurrentUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
        const newRoute = window.location.hash || '#/home';
        setRoute(newRoute);
        if (!isAuthenticated) {
            const isPublicRoute = newRoute.startsWith('#/public') || newRoute.startsWith('#/feedback') || newRoute.startsWith('#/suggestion-form') || newRoute.startsWith('#/revision-form') || newRoute.startsWith('#/portal') || newRoute.startsWith('#/freelancer-portal') || newRoute.startsWith('#/login') || newRoute === '#/home' || newRoute === '#';
            if (!isPublicRoute) {
                window.location.hash = '#/home';
            }
        } else {
            const isAuthLandingPage = newRoute.startsWith('#/login') || newRoute === '#/home' || newRoute === '#';
            if (isAuthLandingPage) {
                window.location.hash = '#/dashboard';
            }
        }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isAuthenticated]);

  useEffect(() => {
      const path = (route.split('?')[0].split('/')[1] || 'home').toLowerCase();
      const newView = Object.values(ViewType).find(v =>
          v.toLowerCase().replace(/ /g, '-') === path
      );
      if (newView) {
          setActiveView(newView);
      } else if (path === 'team') { // Handle 'Freelancer' mapping to 'team' route
          setActiveView(ViewType.TEAM);
      }
  }, [route]);

  useEffect(() => {
        const styleElement = document.getElementById('public-theme-style');
        const isPublicRoute = route.startsWith('#/public') || route.startsWith('#/portal') || route.startsWith('#/freelancer-portal');

        document.body.classList.toggle('app-theme', !isPublicRoute);
        document.body.classList.toggle('public-page-body', isPublicRoute);

        if (isPublicRoute && profile) {
            const brandColor = profile.brandColor || '#3b82f6';

            if (styleElement) {
                const hoverColor = darkenColor(brandColor, 10);
                const brandHsl = hexToHsl(brandColor);
                styleElement.innerHTML = `
                    :root {
                        --public-accent: ${brandColor};
                        --public-accent-hover: ${hoverColor};
                        --public-accent-hsl: ${brandHsl};
                    }
                `;
            }
        } else if (styleElement) {
            styleElement.innerHTML = '';
        }

    }, [route, profile]);

  const showNotification = (message: string, duration: number = 3000) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, duration);
  };

  const handleSetProfile = (value: React.SetStateAction<Profile | null>) => {
    // This would need Supabase integration to update the profile in the database
    console.log("Profile update needed:", value);
  };

  const handleLoginSuccess = async (user: User) => {
    // For backward compatibility with mock login
    setIsAuthenticated(true);
    setCurrentUser(user);
    window.location.hash = '#/dashboard';
  };

  const handleLogout = async () => {
    await AuthService.signOut();
    setIsAuthenticated(false);
    setCurrentUser(null);
    window.location.hash = '#/home';
  };

  const handleMarkAsRead = (notificationId: string) => {
    // This would need Supabase integration to update the notification status
    console.log("Marking notification as read:", notificationId);
    // setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n));
  };

  const handleMarkAllAsRead = () => {
    // This would need Supabase integration to update all notification statuses
    console.log("Marking all notifications as read");
    // setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleNavigation = (view: ViewType, action?: NavigationAction, notificationId?: string) => {
        const pathMap: { [key in ViewType]: string } = {
            [ViewType.HOMEPAGE]: 'home',
            [ViewType.DASHBOARD]: 'dashboard',
            [ViewType.PROSPEK]: 'prospek',
            [ViewType.BOOKING]: 'booking',
            [ViewType.CLIENTS]: 'clients',
            [ViewType.PROJECTS]: 'projects',
            [ViewType.TEAM]: 'team',
            [ViewType.FINANCE]: 'finance',
            [ViewType.CALENDAR]: 'calendar',
            [ViewType.SOCIAL_MEDIA_PLANNER]: 'social-media-planner',
            [ViewType.PACKAGES]: 'packages',
            [ViewType.ASSETS]: 'assets',
            [ViewType.CONTRACTS]: 'contracts',
            [ViewType.PROMO_CODES]: 'promo-codes',
            [ViewType.SOP]: 'sop',
            [ViewType.CLIENT_REPORTS]: 'client-reports',
            [ViewType.SETTINGS]: 'settings',
        };

    const newRoute = `#/${pathMap[view] || view.toLowerCase().replace(/ /g, '-')}`;

    window.location.hash = newRoute;

    setActiveView(view);
    setInitialAction(action || null);
    setIsSidebarOpen(false); // Close sidebar on navigation
    setIsSearchOpen(false); // Close search on navigation
    if (notificationId) {
        handleMarkAsRead(notificationId);
    }
  };

  const hasPermission = (view: ViewType) => {
    if (!currentUser) return false;
    if (currentUser.role === 'Admin') return true;
    if (view === ViewType.DASHBOARD) return true;
    return currentUser.permissions?.includes(view) || false;
  };

  const renderView = () => {
    if (!profile) {
        // Render loading or redirect if profile is not yet loaded
        return <div>Loading profile...</div>;
    }

    if (!hasPermission(activeView)) {
        return <AccessDenied onBackToDashboard={() => setActiveView(ViewType.DASHBOARD)} />;
    }
    switch (activeView) {
      case ViewType.DASHBOARD:
        return <Dashboard
          projects={projects}
          clients={clients}
          transactions={transactions}
          teamMembers={teamMembers}
          cards={cards}
          pockets={pockets}
          handleNavigation={handleNavigation}
          leads={leads}
          teamProjectPayments={teamProjectPayments}
          packages={packages}
          assets={assets}
          clientFeedback={clientFeedback}
          contracts={contracts}
          currentUser={currentUser}
          projectStatusConfig={profile.projectStatusConfig}
        />;
      case ViewType.PROSPEK:
        return <Leads
            leads={leads}
            clients={clients}
            projects={projects}
            packages={packages} addOns={addOns}
            transactions={transactions}
            userProfile={profile}
            cards={cards}
            pockets={pockets}
            promoCodes={promoCodes}
        />;
      case ViewType.BOOKING:
        return <Booking
            leads={leads}
            clients={clients}
            projects={projects}
            packages={packages}
            userProfile={profile}
            handleNavigation={handleNavigation}
        />;
      case ViewType.CLIENTS:
        return <Clients
          clients={clients}
          projects={projects}
          packages={packages} addOns={addOns}
          transactions={transactions}
          userProfile={profile}
          initialAction={initialAction}
          cards={cards}
          pockets={pockets}
          contracts={contracts}
          handleNavigation={handleNavigation}
          clientFeedback={clientFeedback}
          promoCodes={promoCodes}
          // Removed onSignInvoice as it relied on local state setters
          // Removed onSignTransaction as it relied on local state setters
          addNotification={addNotification}
        />;
      case ViewType.PROJECTS:
        return <Projects
          projects={projects}
          clients={clients}
          packages={packages}
          teamMembers={teamMembers}
          teamProjectPayments={teamProjectPayments}
          transactions={transactions}
          initialAction={initialAction}
          profile={profile}
          cards={cards}
        />;
      case ViewType.TEAM:
        return (
          <Freelancers
            teamMembers={teamMembers}
            teamProjectPayments={teamProjectPayments}
            teamPaymentRecords={teamPaymentRecords}
            transactions={transactions}
            userProfile={profile}
            initialAction={initialAction}
            projects={projects}
            rewardLedgerEntries={rewardLedgerEntries}
            pockets={pockets}
            cards={cards}
            // Removed onSignPaymentRecord as it relied on local state setters
          />
        );
      case ViewType.FINANCE:
        return <Finance
          transactions={transactions}
          pockets={pockets}
          projects={projects}
          profile={profile}
          cards={cards}
          teamMembers={teamMembers}
          rewardLedgerEntries={rewardLedgerEntries}
        />;
      case ViewType.PACKAGES:
        return <Packages packages={packages} addOns={addOns} projects={projects} profile={profile} />;
      case ViewType.ASSETS:
        return <Assets assets={assets} profile={profile} />;
      case ViewType.CONTRACTS:
        return <Contracts
            contracts={contracts}
            clients={clients} projects={projects} profile={profile}
            initialAction={initialAction}
            packages={packages}
            // Removed onSignContract as it relied on local state setters
        />;
      case ViewType.SOP:
        return <SOPManagement sops={sops} profile={profile} />;
      case ViewType.SETTINGS:
        return <Settings
          profile={profile}
          setProfile={handleSetProfile}
          transactions={transactions} 
          projects={projects}
          packages={packages}
          users={users}
          currentUser={currentUser}
        />;
      case ViewType.CALENDAR:
        return <CalendarView projects={projects} teamMembers={teamMembers} profile={profile} />;
      case ViewType.CLIENT_REPORTS:
        return <ClientReports
            clients={clients}
            leads={leads}
            projects={projects}
            feedback={clientFeedback}
            showNotification={showNotification}
        />;
      case ViewType.SOCIAL_MEDIA_PLANNER:
        return <SocialPlanner posts={socialMediaPosts} projects={projects} />;
      case ViewType.PROMO_CODES:
        return <PromoCodes promoCodes={promoCodes} projects={projects} />;
      default:
        return <div />;
    }
  };

  // --- ROUTING LOGIC ---
  if (route.startsWith('#/home') || route === '#/') return <Homepage />;
  if (route.startsWith('#/login')) return <Login onLoginSuccess={handleLoginSuccess} users={users} />;

  if (route.startsWith('#/public-packages')) {
    return <PublicPackages
        packages={packages}
        addOns={addOns}
        userProfile={profile}
        showNotification={showNotification}
        // Removed setClients, setProjects, setTransactions, setCards, setLeads, setPromoCodes as they relied on local state setters
        cards={cards}
        promoCodes={promoCodes}
        addNotification={addNotification}
    />;
  }
  if (route.startsWith('#/public-booking')) {
    const allDataForForm = { clients, projects, teamMembers, transactions, teamProjectPayments, teamPaymentRecords, pockets, profile, leads, rewardLedgerEntries, cards, assets, contracts, clientFeedback, notifications, socialMediaPosts, promoCodes, sops, packages, addOns };
    return <PublicBookingForm {...allDataForForm} userProfile={profile} showNotification={showNotification}
        // Removed setClients, setProjects, setTransactions, setCards, setPockets, setPromoCodes, setLeads as they relied on local state setters
        addNotification={addNotification}
    />;
  }
  if (route.startsWith('#/public-lead-form')) {
    return <PublicLeadForm userProfile={profile} showNotification={showNotification} /* Removed setLeads */ />;
  }

  if (route.startsWith('#/feedback')) return <PublicFeedbackForm /* Removed setClientFeedback */ />;
  if (route.startsWith('#/suggestion-form')) return <SuggestionForm /* Removed setLeads */ />;
  if (route.startsWith('#/revision-form')) return <PublicRevisionForm projects={projects} teamMembers={teamMembers} /* Removed onUpdateRevision */ />;
  if (route.startsWith('#/portal/')) {
    const accessId = route.split('/portal/')[1];
    return <ClientPortal accessId={accessId} clients={clients} projects={projects} /* Removed setClientFeedback */ showNotification={showNotification} contracts={contracts} transactions={transactions} userProfile={profile} packages={packages} /* Removed onClientConfirmation, onClientSubStatusConfirmation, onSignContract */ />;
  }
  if (route.startsWith('#/freelancer-portal/')) {
     const accessId = route.split('/freelancer-portal/')[1];
     return <FreelancerPortal accessId={accessId} teamMembers={teamMembers} projects={projects} teamProjectPayments={teamProjectPayments} teamPaymentRecords={teamPaymentRecords} rewardLedgerEntries={rewardLedgerEntries} showNotification={showNotification} /* Removed onUpdateRevision */ sops={sops} userProfile={profile} />;
  }

  if (!isAuthenticated) return <Login onLoginSuccess={handleLoginSuccess} users={users} />;

  return (
    <div className="
        flex h-screen
        bg-brand-bg
        text-brand-text-primary
        overflow-hidden
    ">
      <Sidebar
        activeView={activeView}
        setActiveView={(view) => handleNavigation(view)}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        currentUser={currentUser}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
            pageTitle={activeView}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            setIsSearchOpen={setIsSearchOpen}
            notifications={notifications}
            handleNavigation={handleNavigation}
            handleMarkAllAsRead={handleMarkAllAsRead}
            currentUser={currentUser}
            profile={profile}
            handleLogout={handleLogout}
        />

        <main className="
            flex-1
            overflow-x-hidden
            overflow-y-auto
            p-3 sm:p-4 md:p-6 lg:p-8
            pb-20 xl:pb-8
            overscroll-contain
        "
        style={{
            WebkitOverflowScrolling: 'touch',
            paddingBottom: 'calc(5rem + var(--safe-area-inset-bottom, 0px))'
        }}>
            <div className="animate-fade-in">
                {renderView()}
            </div>
        </main>
      </div>

      {/* Enhanced Notification Toast */}
      {notification && (
        <div className="
            fixed top-4 right-4
            sm:top-6 sm:right-6
            bg-brand-accent
            text-white
            py-3 px-4 sm:py-4 sm:px-6
            rounded-xl
            shadow-2xl
            z-50
            animate-fade-in-out
            backdrop-blur-sm
            border border-brand-accent-hover/20
            max-w-sm
            break-words
        "
        style={{
            top: 'calc(1rem + var(--safe-area-inset-top, 0px))',
            right: 'calc(1rem + var(--safe-area-inset-right, 0px))'
        }}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse-soft" />
            <span className="font-medium text-sm sm:text-base">{notification}</span>
          </div>
        </div>
      )}

      <GlobalSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        clients={clients}
        projects={projects}
        teamMembers={teamMembers}
        handleNavigation={handleNavigation}
      />

      <BottomNavBar activeView={activeView} handleNavigation={handleNavigation} />
    </div>
  );
};

export default App;