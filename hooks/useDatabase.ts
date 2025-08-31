
import { useState, useEffect } from 'react'
import { DatabaseService } from '../lib/database'
import { 
  Client, Project, User, Lead, Package, Transaction, TeamMember, Asset,
  Contract, PromoCode, SOP, SocialMediaPost, AddOn, FinancialPocket,
  Card, TeamProjectPayment, Notification, Profile, ClientFeedback
} from '../types'

export const useClients = () => {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadClients()
    
    const subscription = DatabaseService.subscribeToClients(setClients)
    
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const loadClients = async () => {
    try {
      setLoading(true)
      const data = await DatabaseService.getClients()
      setClients(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load clients')
    } finally {
      setLoading(false)
    }
  }

  const createClient = async (client: Omit<Client, 'id'>) => {
    try {
      const newClient = await DatabaseService.createClient(client)
      if (newClient) {
        setClients(prev => [newClient, ...prev])
        return newClient
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create client')
    }
    return null
  }

  const updateClient = async (id: string, updates: Partial<Client>) => {
    try {
      const success = await DatabaseService.updateClient(id, updates)
      if (success) {
        setClients(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c))
        return true
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update client')
    }
    return false
  }

  const deleteClient = async (id: string) => {
    try {
      const success = await DatabaseService.deleteClient(id)
      if (success) {
        setClients(prev => prev.filter(c => c.id !== id))
        return true
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete client')
    }
    return false
  }

  return {
    clients,
    loading,
    error,
    createClient,
    updateClient,
    deleteClient,
    refresh: loadClients
  }
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadProjects()
    
    const subscription = DatabaseService.subscribeToProjects(setProjects)
    
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const loadProjects = async () => {
    try {
      setLoading(true)
      const data = await DatabaseService.getProjects()
      setProjects(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  const createProject = async (project: Omit<Project, 'id'>) => {
    try {
      const newProject = await DatabaseService.createProject(project)
      if (newProject) {
        setProjects(prev => [newProject, ...prev])
        return newProject
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project')
    }
    return null
  }

  const updateProject = async (id: string, updates: Partial<Project>) => {
    try {
      const success = await DatabaseService.updateProject(id, updates)
      if (success) {
        setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
        return true
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update project')
    }
    return false
  }

  const deleteProject = async (id: string) => {
    try {
      const success = await DatabaseService.deleteProject(id)
      if (success) {
        setProjects(prev => prev.filter(p => p.id !== id))
        return true
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project')
    }
    return false
  }

  return {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
    refresh: loadProjects
  }
}

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      const data = await DatabaseService.getUsers()
      setUsers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  return {
    users,
    loading,
    error,
    refresh: loadUsers
  }
}

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadLeads()
  }, [])

  const loadLeads = async () => {
    try {
      setLoading(true)
      const data = await DatabaseService.getLeads()
      setLeads(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load leads')
    } finally {
      setLoading(false)
    }
  }

  const createLead = async (lead: Omit<Lead, 'id'>) => {
    try {
      const newLead = await DatabaseService.createLead(lead)
      if (newLead) {
        setLeads(prev => [newLead, ...prev])
        return newLead
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create lead')
    }
    return null
  }

  const updateLead = async (id: string, updates: Partial<Lead>) => {
    try {
      const success = await DatabaseService.updateLead(id, updates)
      if (success) {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l))
        return true
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update lead')
    }
    return false
  }

  return {
    leads,
    loading,
    error,
    createLead,
    updateLead,
    refresh: loadLeads
  }
}

export const usePackages = () => {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadPackages()
  }, [])

  const loadPackages = async () => {
    try {
      setLoading(true)
      const data = await DatabaseService.getPackages()
      setPackages(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load packages')
    } finally {
      setLoading(false)
    }
  }

  return {
    packages,
    loading,
    error,
    refresh: loadPackages
  }
}

export const useTeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadTeamMembers()
  }, [])

  const loadTeamMembers = async () => {
    try {
      setLoading(true)
      const data = await DatabaseService.getTeamMembers()
      setTeamMembers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load team members')
    } finally {
      setLoading(false)
    }
  }

  return {
    teamMembers,
    loading,
    error,
    refresh: loadTeamMembers
  }
}

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadTransactions()
  }, [])

  const loadTransactions = async () => {
    try {
      setLoading(true)
      const data = await DatabaseService.getTransactions()
      setTransactions(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load transactions')
    } finally {
      setLoading(false)
    }
  }

  return {
    transactions,
    loading,
    error,
    refresh: loadTransactions
  }
}

export const useAssets = () => {
  const [assets, setAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadAssets()
  }, [])

  const loadAssets = async () => {
    try {
      setLoading(true)
      const data = await DatabaseService.getAssets()
      setAssets(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load assets')
    } finally {
      setLoading(false)
    }
  }

  return {
    assets,
    loading,
    error,
    refresh: loadAssets
  }
}

export const useContracts = () => {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadContracts()
  }, [])

  const loadContracts = async () => {
    try {
      setLoading(true)
      const data = await DatabaseService.getContracts()
      setContracts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load contracts')
    } finally {
      setLoading(false)
    }
  }

  return {
    contracts,
    loading,
    error,
    refresh: loadContracts
  }
}

export const usePromoCodes = () => {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadPromoCodes()
  }, [])

  const loadPromoCodes = async () => {
    try {
      setLoading(true)
      const data = await DatabaseService.getPromoCodes()
      setPromoCodes(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load promo codes')
    } finally {
      setLoading(false)
    }
  }

  return {
    promoCodes,
    loading,
    error,
    refresh: loadPromoCodes
  }
}

export const useSOPs = () => {
  const [sops, setSOPs] = useState<SOP[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadSOPs()
  }, [])

  const loadSOPs = async () => {
    try {
      setLoading(true)
      const data = await DatabaseService.getSOPs()
      setSOPs(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load SOPs')
    } finally {
      setLoading(false)
    }
  }

  return {
    sops,
    loading,
    error,
    refresh: loadSOPs
  }
}

export const useSocialMediaPosts = () => {
  const [socialMediaPosts, setSocialMediaPosts] = useState<SocialMediaPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadSocialMediaPosts()
  }, [])

  const loadSocialMediaPosts = async () => {
    try {
      setLoading(true)
      const data = await DatabaseService.getSocialMediaPosts()
      setSocialMediaPosts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load social media posts')
    } finally {
      setLoading(false)
    }
  }

  return {
    socialMediaPosts,
    loading,
    error,
    refresh: loadSocialMediaPosts
  }
}

export const useAddOns = () => {
  const [addOns, setAddOns] = useState<AddOn[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadAddOns()
  }, [])

  const loadAddOns = async () => {
    try {
      setLoading(true)
      const data = await DatabaseService.getAddOns()
      setAddOns(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load add-ons')
    } finally {
      setLoading(false)
    }
  }

  return {
    addOns,
    loading,
    error,
    refresh: loadAddOns
  }
}

export const useFinancialPockets = () => {
  const [pockets, setPockets] = useState<FinancialPocket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadPockets()
  }, [])

  const loadPockets = async () => {
    try {
      setLoading(true)
      const data = await DatabaseService.getFinancialPockets()
      setPockets(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load financial pockets')
    } finally {
      setLoading(false)
    }
  }

  return {
    pockets,
    loading,
    error,
    refresh: loadPockets
  }
}

export const useCards = () => {
  const [cards, setCards] = useState<Card[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadCards()
  }, [])

  const loadCards = async () => {
    try {
      setLoading(true)
      const data = await DatabaseService.getCards()
      setCards(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load cards')
    } finally {
      setLoading(false)
    }
  }

  return {
    cards,
    loading,
    error,
    refresh: loadCards
  }
}

export const useTeamProjectPayments = () => {
  const [teamProjectPayments, setTeamProjectPayments] = useState<TeamProjectPayment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadTeamProjectPayments()
  }, [])

  const loadTeamProjectPayments = async () => {
    try {
      setLoading(true)
      const data = await DatabaseService.getTeamProjectPayments()
      setTeamProjectPayments(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load team project payments')
    } finally {
      setLoading(false)
    }
  }

  return {
    teamProjectPayments,
    loading,
    error,
    refresh: loadTeamProjectPayments
  }
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadNotifications()
  }, [])

  const loadNotifications = async () => {
    try {
      setLoading(true)
      const data = await DatabaseService.getNotifications()
      setNotifications(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load notifications')
    } finally {
      setLoading(false)
    }
  }

  return {
    notifications,
    loading,
    error,
    refresh: loadNotifications
  }
}

export const useProfiles = () => {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadProfiles()
  }, [])

  const loadProfiles = async () => {
    try {
      setLoading(true)
      const data = await DatabaseService.getProfiles()
      setProfiles(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profiles')
    } finally {
      setLoading(false)
    }
  }

  return {
    profiles,
    loading,
    error,
    refresh: loadProfiles
  }
}

export const useClientFeedback = () => {
  const [clientFeedback, setClientFeedback] = useState<ClientFeedback[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadClientFeedback()
  }, [])

  const loadClientFeedback = async () => {
    try {
      setLoading(true)
      const data = await DatabaseService.getClientFeedback()
      setClientFeedback(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load client feedback')
    } finally {
      setLoading(false)
    }
  }

  return {
    clientFeedback,
    loading,
    error,
    refresh: loadClientFeedback
  }
}
