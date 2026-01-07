import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { apiService } from 'authscape';

const ContentManagementContext = createContext(null);

export const ContentManagementProvider = ({ children, oemCompanyId, config, configLoad }) => {
  // Navigation state
  const [activeSection, setActiveSection] = useState('pages');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Page management state
  const [selectedPage, setSelectedPage] = useState(null);
  const [isVisualBuilderOpen, setIsVisualBuilderOpen] = useState(false);
  const [pages, setPages] = useState([]);
  const [pageTypes, setPageTypes] = useState([]);
  const [pageRoots, setPageRoots] = useState([]);
  const [pagesLoading, setPagesLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState(3); // Default: Update Date (Ascending)
  const [activeFilters, setActiveFilters] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Assets state
  const [assets, setAssets] = useState([]);
  const [assetsLoading, setAssetsLoading] = useState(false);

  // URL Routes state
  const [urlRoutes, setUrlRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);

  // Blocked contacts state
  const [blockedContacts, setBlockedContacts] = useState([]);
  const [selectedBlockedContact, setSelectedBlockedContact] = useState(null);

  // Notification state
  const [notification, setNotification] = useState(null);

  // Fetch pages
  const fetchPages = useCallback(async () => {
    setPagesLoading(true);
    try {
      const response = await apiService().post('/ContentManagement/GetPages', {
        offset: currentPage,
        length: pageSize,
        privateLabelCompanyId: oemCompanyId,
        search: searchQuery,
        sort: sortOption,
        chipFilters: activeFilters,
      });

      if (response?.status === 200) {
        setPages(response.data.data || []);
        setTotalPages(response.data.recordsTotal || 0);
      }
    } catch (error) {
      console.error('Error fetching pages:', error);
      showNotification('Failed to load pages', 'error');
    } finally {
      setPagesLoading(false);
    }
  }, [currentPage, pageSize, oemCompanyId, searchQuery, sortOption, activeFilters]);

  // Fetch page types
  const fetchPageTypes = useCallback(async () => {
    try {
      const response = await apiService().get('/ContentManagement/GetPageTypes');
      if (response?.status === 200) {
        setPageTypes(response.data || []);
      }
    } catch (error) {
      console.error('Error fetching page types:', error);
    }
  }, []);

  // Fetch page roots (URL routes)
  const fetchPageRoots = useCallback(async () => {
    try {
      const response = await apiService().get(
        `/ContentManagement/GetPageRoots?privateLabelCompanyId=${oemCompanyId || ''}`
      );
      if (response?.status === 200) {
        setPageRoots(response.data || []);
        setUrlRoutes(response.data || []);
      }
    } catch (error) {
      console.error('Error fetching page roots:', error);
    }
  }, [oemCompanyId]);

  // Create page
  const createPage = useCallback(async (pageData) => {
    try {
      const response = await apiService().post('/ContentManagement/CreateNewPage', {
        ...pageData,
        privateLabelCompanyId: oemCompanyId,
      });

      if (response?.status === 200) {
        showNotification('Page created successfully', 'success');
        await fetchPages();
        return response.data;
      }
    } catch (error) {
      console.error('Error creating page:', error);
      showNotification('Failed to create page', 'error');
      throw error;
    }
  }, [oemCompanyId, fetchPages]);

  // Update page
  const updatePage = useCallback(async (pageData) => {
    try {
      const response = await apiService().post('/ContentManagement/UpdatePage', {
        ...pageData,
        privateLabelCompanyId: oemCompanyId,
      });

      if (response?.status === 200) {
        showNotification('Page updated successfully', 'success');
        await fetchPages();
        // Update selected page if it was the one being edited
        if (selectedPage?.id === pageData.pageId) {
          setSelectedPage(prev => ({ ...prev, ...pageData }));
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating page:', error);
      showNotification('Failed to update page', 'error');
      throw error;
    }
  }, [oemCompanyId, fetchPages, selectedPage]);

  // Delete page
  const deletePage = useCallback(async (pageId) => {
    try {
      const response = await apiService().post(`/ContentManagement/RemovePage?pageId=${pageId}`);

      if (response?.status === 200) {
        showNotification('Page deleted successfully', 'success');
        // Clear selection if deleted page was selected
        if (selectedPage?.id === pageId) {
          setSelectedPage(null);
        }
        await fetchPages();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting page:', error);
      showNotification('Failed to delete page', 'error');
      throw error;
    }
  }, [fetchPages, selectedPage]);

  // Duplicate page
  const duplicatePage = useCallback(async (page) => {
    try {
      const response = await apiService().post(
        `/ContentManagement/CreatePageDuplication?pageId=${page.id}${
          page.oemCompanyId ? `&oemCompanyId=${page.oemCompanyId}` : ''
        }`
      );

      if (response?.status === 200) {
        showNotification('Page duplicated successfully', 'success');
        await fetchPages();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error duplicating page:', error);
      showNotification('Failed to duplicate page', 'error');
      throw error;
    }
  }, [fetchPages]);

  // Get page details
  const getPageDetails = useCallback(async (pageId) => {
    try {
      const response = await apiService().get(`/ContentManagement/GetPage?pageId=${pageId}`);
      if (response?.status === 200) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching page details:', error);
      return null;
    }
  }, []);

  // Open visual builder
  const openVisualBuilder = useCallback((pageId) => {
    setIsVisualBuilderOpen(pageId);
  }, []);

  // Close visual builder (without reload)
  const closeVisualBuilder = useCallback(() => {
    setIsVisualBuilderOpen(false);
    fetchPages(); // Refresh pages instead of window.location.reload()
    if (configLoad) {
      configLoad();
    }
  }, [fetchPages, configLoad]);

  // Select page for editing
  const selectPage = useCallback(async (page) => {
    if (page) {
      // Fetch full page details
      const details = await getPageDetails(page.id);
      setSelectedPage(details || page);
    } else {
      setSelectedPage(null);
    }
  }, [getPageDetails]);

  // Create URL route
  const createUrlRoute = useCallback(async (routeData) => {
    try {
      const response = await apiService().post('/ContentManagement/CreatePageRoot', {
        ...routeData,
        privateLabelCompanyId: oemCompanyId,
      });

      if (response?.status === 200) {
        showNotification('URL route created successfully', 'success');
        await fetchPageRoots();
        return response.data;
      }
    } catch (error) {
      console.error('Error creating URL route:', error);
      showNotification('Failed to create URL route', 'error');
      throw error;
    }
  }, [oemCompanyId, fetchPageRoots]);

  // Delete URL route
  const deleteUrlRoute = useCallback(async (routeId) => {
    try {
      const response = await apiService().post(`/ContentManagement/RemovePageRoot?pageRootId=${routeId}`);

      if (response?.status === 200) {
        showNotification('URL route deleted successfully', 'success');
        await fetchPageRoots();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting URL route:', error);
      showNotification('Failed to delete URL route', 'error');
      throw error;
    }
  }, [fetchPageRoots]);

  // Show notification
  const showNotification = useCallback((message, severity = 'info') => {
    setNotification({ message, severity });
    // Auto-clear after 5 seconds
    setTimeout(() => setNotification(null), 5000);
  }, []);

  // Clear notification
  const clearNotification = useCallback(() => {
    setNotification(null);
  }, []);

  // Navigation helpers
  const navigateTo = useCallback((section) => {
    setActiveSection(section);
    setSelectedPage(null);
    setSelectedRoute(null);
    setSelectedBlockedContact(null);
  }, []);

  // Breadcrumb generation
  const getBreadcrumbs = useCallback(() => {
    const crumbs = [];

    const sectionLabels = {
      pages: 'Pages',
      assets: 'Assets',
      routes: 'URL Routes',
      blocklist: 'Blocked Contacts',
      branding: 'App Icon & Colors',
      typography: 'Typography',
      css: 'Custom CSS',
      scripts: 'Script Imports',
      'ai-assistant': 'AI Assistant',
    };

    crumbs.push({ label: 'Content Management', path: null });
    crumbs.push({ label: sectionLabels[activeSection] || activeSection, path: activeSection });

    if (selectedPage) {
      crumbs.push({ label: selectedPage.title, path: null });
      if (isVisualBuilderOpen) {
        crumbs.push({ label: 'Visual Editor', path: null });
      }
    }

    return crumbs;
  }, [activeSection, selectedPage, isVisualBuilderOpen]);

  // Initialize data
  useEffect(() => {
    fetchPageTypes();
    fetchPageRoots();
  }, [fetchPageTypes, fetchPageRoots]);

  // Refetch pages when filters change
  useEffect(() => {
    if (activeSection === 'pages') {
      fetchPages();
    }
  }, [activeSection, fetchPages]);

  const value = {
    // Navigation
    activeSection,
    setActiveSection,
    navigateTo,
    sidebarCollapsed,
    setSidebarCollapsed,
    getBreadcrumbs,

    // Pages
    pages,
    selectedPage,
    selectPage,
    setSelectedPage,
    pageTypes,
    pageRoots,
    pagesLoading,
    totalPages,
    fetchPages,
    createPage,
    updatePage,
    deletePage,
    duplicatePage,
    getPageDetails,

    // Visual Builder
    isVisualBuilderOpen,
    openVisualBuilder,
    closeVisualBuilder,

    // Search & Filter
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
    activeFilters,
    setActiveFilters,

    // Pagination
    currentPage,
    setCurrentPage,
    pageSize,

    // Assets
    assets,
    assetsLoading,

    // URL Routes
    urlRoutes,
    selectedRoute,
    setSelectedRoute,
    createUrlRoute,
    deleteUrlRoute,
    fetchPageRoots,

    // Blocked Contacts
    blockedContacts,
    selectedBlockedContact,
    setSelectedBlockedContact,

    // Notifications
    notification,
    showNotification,
    clearNotification,

    // Config
    oemCompanyId,
    config,
    configLoad,
  };

  return (
    <ContentManagementContext.Provider value={value}>
      {children}
    </ContentManagementContext.Provider>
  );
};

export const useContentManagement = () => {
  const context = useContext(ContentManagementContext);
  if (!context) {
    throw new Error('useContentManagement must be used within a ContentManagementProvider');
  }
  return context;
};

export default useContentManagement;
