
import { supabase } from './supabase'
import { 
  User, Client, Project, Lead, Package, Transaction, TeamMember, Asset,
  Contract, PromoCode, SOP, SocialMediaPost, AddOn, FinancialPocket,
  Card, TeamProjectPayment, Notification, Profile, ClientFeedback
} from '../types'

export class DatabaseService {
  // Users
  static async getUsers(): Promise<User[]> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
    
    if (error) {
      console.error('Error fetching users:', error)
      return []
    }
    
    return data.map(user => ({
      id: user.id,
      email: user.email,
      password: '',
      fullName: user.full_name,
      companyName: user.company_name,
      role: user.role,
      permissions: user.permissions
    }))
  }

  static async createUser(user: Omit<User, 'id'>): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .insert({
        email: user.email,
        full_name: user.fullName,
        company_name: user.companyName,
        role: user.role,
        permissions: user.permissions
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating user:', error)
      return null
    }

    return {
      id: data.id,
      email: data.email,
      password: '',
      fullName: data.full_name,
      companyName: data.company_name,
      role: data.role,
      permissions: data.permissions
    }
  }

  // Clients
  static async getClients(): Promise<Client[]> {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching clients:', error)
      return []
    }
    
    return data.map(client => ({
      id: client.id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      whatsapp: client.whatsapp,
      since: client.since,
      instagram: client.instagram,
      status: client.status as any,
      clientType: client.client_type as any,
      lastContact: client.last_contact,
      portalAccessId: client.portal_access_id
    }))
  }

  static async createClient(client: Omit<Client, 'id'>): Promise<Client | null> {
    const { data, error } = await supabase
      .from('clients')
      .insert({
        name: client.name,
        email: client.email,
        phone: client.phone,
        whatsapp: client.whatsapp,
        since: client.since,
        instagram: client.instagram,
        status: client.status,
        client_type: client.clientType,
        last_contact: client.lastContact,
        portal_access_id: client.portalAccessId
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating client:', error)
      return null
    }

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      whatsapp: data.whatsapp,
      since: data.since,
      instagram: data.instagram,
      status: data.status,
      clientType: data.client_type,
      lastContact: data.last_contact,
      portalAccessId: data.portal_access_id
    }
  }

  static async updateClient(id: string, updates: Partial<Client>): Promise<boolean> {
    const { error } = await supabase
      .from('clients')
      .update({
        name: updates.name,
        email: updates.email,
        phone: updates.phone,
        whatsapp: updates.whatsapp,
        instagram: updates.instagram,
        status: updates.status,
        client_type: updates.clientType,
        last_contact: updates.lastContact
      })
      .eq('id', id)

    if (error) {
      console.error('Error updating client:', error)
      return false
    }
    
    return true
  }

  static async deleteClient(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting client:', error)
      return false
    }
    
    return true
  }

  // Projects
  static async getProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        clients (
          id,
          name,
          email
        )
      `)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching projects:', error)
      return []
    }
    
    return data.map(project => ({
      id: project.id,
      name: project.name,
      clientId: project.client_id,
      status: project.status,
      projectType: project.project_type,
      startDate: project.start_date,
      endDate: project.end_date,
      totalValue: project.total_value,
      client: project.clients ? {
        id: project.clients.id,
        name: project.clients.name,
        email: project.clients.email
      } : undefined
    })) as Project[]
  }

  static async createProject(project: Omit<Project, 'id'>): Promise<Project | null> {
    const { data, error } = await supabase
      .from('projects')
      .insert({
        name: project.name,
        client_id: project.clientId,
        status: project.status,
        project_type: project.projectType,
        start_date: project.startDate,
        end_date: project.endDate,
        total_value: project.totalValue
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating project:', error)
      return null
    }

    return {
      id: data.id,
      name: data.name,
      clientId: data.client_id,
      status: data.status,
      projectType: data.project_type,
      startDate: data.start_date,
      endDate: data.end_date,
      totalValue: data.total_value
    } as Project
  }

  static async updateProject(id: string, updates: Partial<Project>): Promise<boolean> {
    const { error } = await supabase
      .from('projects')
      .update({
        name: updates.name,
        status: updates.status,
        project_type: updates.projectType,
        start_date: updates.startDate,
        end_date: updates.endDate,
        total_value: updates.totalValue
      })
      .eq('id', id)

    if (error) {
      console.error('Error updating project:', error)
      return false
    }
    
    return true
  }

  static async deleteProject(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting project:', error)
      return false
    }
    
    return true
  }

  // Leads
  static async getLeads(): Promise<Lead[]> {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching leads:', error)
      return []
    }
    
    return data.map(lead => ({
      id: lead.id,
      name: lead.name,
      contactChannel: lead.contact_channel,
      location: lead.location,
      status: lead.status,
      date: lead.date,
      notes: lead.notes,
      whatsapp: lead.whatsapp
    })) as Lead[]
  }

  static async createLead(lead: Omit<Lead, 'id'>): Promise<Lead | null> {
    const { data, error } = await supabase
      .from('leads')
      .insert({
        name: lead.name,
        contact_channel: lead.contactChannel,
        location: lead.location,
        status: lead.status,
        date: lead.date,
        notes: lead.notes,
        whatsapp: lead.whatsapp
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating lead:', error)
      return null
    }

    return {
      id: data.id,
      name: data.name,
      contactChannel: data.contact_channel,
      location: data.location,
      status: data.status,
      date: data.date,
      notes: data.notes,
      whatsapp: data.whatsapp
    } as Lead
  }

  static async updateLead(id: string, updates: Partial<Lead>): Promise<boolean> {
    const { error } = await supabase
      .from('leads')
      .update({
        name: updates.name,
        contact_channel: updates.contactChannel,
        location: updates.location,
        status: updates.status,
        notes: updates.notes,
        whatsapp: updates.whatsapp
      })
      .eq('id', id)

    if (error) {
      console.error('Error updating lead:', error)
      return false
    }
    
    return true
  }

  // Packages
  static async getPackages(): Promise<Package[]> {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching packages:', error)
      return []
    }
    
    return data.map(pkg => ({
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      category: pkg.category,
      physicalItems: pkg.physical_items,
      digitalItems: pkg.digital_items,
      processingTime: pkg.processing_time,
      defaultPrintingCost: pkg.default_printing_cost,
      defaultTransportCost: pkg.default_transport_cost,
      photographers: pkg.photographers,
      videographers: pkg.videographers,
      coverImage: pkg.cover_image
    })) as Package[]
  }

  // Team Members
  static async getTeamMembers(): Promise<TeamMember[]> {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching team members:', error)
      return []
    }
    
    return data.map(member => ({
      id: member.id,
      name: member.name,
      email: member.email,
      phone: member.phone,
      role: member.role,
      specialization: member.specialization,
      hourlyRate: member.hourly_rate,
      portalAccessId: member.portal_access_id
    })) as TeamMember[]
  }

  // Transactions
  static async getTransactions(): Promise<Transaction[]> {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching transactions:', error)
      return []
    }
    
    return data.map(transaction => ({
      id: transaction.id,
      projectId: transaction.project_id,
      clientId: transaction.client_id,
      amount: transaction.amount,
      type: transaction.transaction_type,
      status: transaction.status,
      date: transaction.date,
      description: transaction.description
    })) as Transaction[]
  }

  // Assets
  static async getAssets(): Promise<Asset[]> {
    const { data, error } = await supabase
      .from('assets')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching assets:', error)
      return []
    }
    
    return data.map(asset => ({
      id: asset.id,
      name: asset.name,
      category: asset.category,
      purchaseDate: asset.purchase_date,
      purchasePrice: asset.purchase_price,
      serialNumber: asset.serial_number,
      status: asset.status,
      notes: asset.notes
    })) as Asset[]
  }

  // Contracts
  static async getContracts(): Promise<Contract[]> {
    const { data, error } = await supabase
      .from('contracts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching contracts:', error)
      return []
    }
    
    return data.map(contract => ({
      id: contract.id,
      contractNumber: contract.contract_number,
      clientId: contract.client_id,
      projectId: contract.project_id,
      signingDate: contract.signing_date,
      signingLocation: contract.signing_location,
      clientName1: contract.client_name1,
      clientAddress1: contract.client_address1,
      clientPhone1: contract.client_phone1,
      clientName2: contract.client_name2,
      clientAddress2: contract.client_address2,
      clientPhone2: contract.client_phone2,
      shootingDuration: contract.shooting_duration,
      guaranteedPhotos: contract.guaranteed_photos,
      albumDetails: contract.album_details,
      digitalFilesFormat: contract.digital_files_format,
      otherItems: contract.other_items,
      personnelCount: contract.personnel_count,
      deliveryTimeframe: contract.delivery_timeframe,
      dpDate: contract.dp_date,
      finalPaymentDate: contract.final_payment_date,
      cancellationPolicy: contract.cancellation_policy,
      jurisdiction: contract.jurisdiction,
      vendorSignature: contract.vendor_signature,
      clientSignature: contract.client_signature
    })) as Contract[]
  }

  // Promo Codes
  static async getPromoCodes(): Promise<PromoCode[]> {
    const { data, error } = await supabase
      .from('promo_codes')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching promo codes:', error)
      return []
    }
    
    return data.map(promo => ({
      id: promo.id,
      code: promo.code,
      discountType: promo.discount_type,
      discountValue: promo.discount_value,
      isActive: promo.is_active,
      usageCount: promo.usage_count,
      maxUsage: promo.max_usage,
      expiryDate: promo.expiry_date
    })) as PromoCode[]
  }

  // SOPs
  static async getSOPs(): Promise<SOP[]> {
    const { data, error } = await supabase
      .from('sops')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching SOPs:', error)
      return []
    }
    
    return data.map(sop => ({
      id: sop.id,
      title: sop.title,
      category: sop.category,
      content: sop.content,
      lastUpdated: sop.last_updated
    })) as SOP[]
  }

  // Social Media Posts
  static async getSocialMediaPosts(): Promise<SocialMediaPost[]> {
    const { data, error } = await supabase
      .from('social_media_posts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching social media posts:', error)
      return []
    }
    
    return data.map(post => ({
      id: post.id,
      projectId: post.project_id,
      clientName: post.client_name,
      postType: post.post_type,
      platform: post.platform,
      scheduledDate: post.scheduled_date,
      caption: post.caption,
      mediaUrl: post.media_url,
      status: post.status,
      notes: post.notes
    })) as SocialMediaPost[]
  }

  // Add-ons
  static async getAddOns(): Promise<AddOn[]> {
    const { data, error } = await supabase
      .from('add_ons')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching add-ons:', error)
      return []
    }
    
    return data.map(addon => ({
      id: addon.id,
      name: addon.name,
      price: addon.price
    })) as AddOn[]
  }

  // Financial Pockets
  static async getFinancialPockets(): Promise<FinancialPocket[]> {
    const { data, error } = await supabase
      .from('financial_pockets')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching financial pockets:', error)
      return []
    }
    
    return data.map(pocket => ({
      id: pocket.id,
      name: pocket.name,
      description: pocket.description,
      icon: pocket.icon,
      type: pocket.pocket_type,
      amount: pocket.amount,
      goalAmount: pocket.goal_amount,
      lockEndDate: pocket.lock_end_date,
      sourceCardId: pocket.source_card_id
    })) as FinancialPocket[]
  }

  // Cards
  static async getCards(): Promise<Card[]> {
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching cards:', error)
      return []
    }
    
    return data.map(card => ({
      id: card.id,
      cardHolderName: card.card_holder_name,
      bankName: card.bank_name,
      cardType: card.card_type,
      lastFourDigits: card.last_four_digits,
      expiryDate: card.expiry_date,
      balance: card.balance,
      colorGradient: card.color_gradient
    })) as Card[]
  }

  // Team Project Payments
  static async getTeamProjectPayments(): Promise<TeamProjectPayment[]> {
    const { data, error } = await supabase
      .from('team_project_payments')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching team project payments:', error)
      return []
    }
    
    return data.map(payment => ({
      id: payment.id,
      projectId: payment.project_id,
      teamMemberName: payment.team_member_name,
      teamMemberId: payment.team_member_id,
      date: payment.date,
      status: payment.status,
      fee: payment.fee,
      reward: payment.reward
    })) as TeamProjectPayment[]
  }

  // Notifications
  static async getNotifications(): Promise<Notification[]> {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching notifications:', error)
      return []
    }
    
    return data.map(notif => ({
      id: notif.id,
      title: notif.title,
      message: notif.message,
      timestamp: notif.timestamp,
      isRead: notif.is_read,
      icon: notif.icon,
      linkView: notif.link_view,
      linkAction: notif.link_action
    })) as Notification[]
  }

  // Profiles
  static async getProfiles(): Promise<Profile[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching profiles:', error)
      return []
    }
    
    return data.map(profile => ({
      id: profile.id,
      userId: profile.user_id,
      companyName: profile.company_name,
      ownerName: profile.owner_name,
      phone: profile.phone,
      email: profile.email,
      address: profile.address,
      website: profile.website,
      instagram: profile.instagram,
      bankAccountName: profile.bank_account_name,
      bankName: profile.bank_name,
      bankAccountNumber: profile.bank_account_number
    })) as Profile[]
  }

  // Client Feedback
  static async getClientFeedback(): Promise<ClientFeedback[]> {
    const { data, error } = await supabase
      .from('client_feedback')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching client feedback:', error)
      return []
    }
    
    return data.map(feedback => ({
      id: feedback.id,
      clientId: feedback.client_id,
      clientName: feedback.client_name,
      satisfaction: feedback.satisfaction,
      rating: feedback.rating,
      feedback: feedback.feedback,
      date: feedback.date
    })) as ClientFeedback[]
  }

  // Real-time subscriptions
  static subscribeToClients(callback: (clients: Client[]) => void) {
    return supabase
      .channel('clients')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'clients' },
        () => {
          this.getClients().then(callback)
        }
      )
      .subscribe()
  }

  static subscribeToProjects(callback: (projects: Project[]) => void) {
    return supabase
      .channel('projects')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'projects' },
        () => {
          this.getProjects().then(callback)
        }
      )
      .subscribe()
  }
}
