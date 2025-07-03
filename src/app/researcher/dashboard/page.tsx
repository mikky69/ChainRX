'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ChartBarIcon, 
  DocumentTextIcon, 
  UserGroupIcon, 
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  ArrowUpTrayIcon,
  DocumentArrowDownIcon,
  ChartPieIcon,
  BellIcon
} from '@heroicons/react/24/outline';

type Dataset = {
  id: string;
  title: string;
  description: string;
  category: string;
  records: number;
  lastUpdated: string;
  access: 'public' | 'restricted';
};

type ResearchProject = {
  id: string;
  title: string;
  status: 'active' | 'completed' | 'draft';
  lastModified: string;
  collaborators: number;
};

export default function ResearcherDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const recentDatasets: Dataset[] = [
    {
      id: 'ds-1001',
      title: 'Clinical Trial Data 2023',
      description: 'Patient data from Phase 3 clinical trials for Drug-X',
      category: 'Clinical Trials',
      records: 1250,
      lastUpdated: '2023-11-15',
      access: 'restricted',
    },
    {
      id: 'ds-1002',
      title: 'Adverse Drug Reactions 2022',
      description: 'Reported adverse reactions across multiple medications',
      category: 'Pharmacovigilance',
      records: 8560,
      lastUpdated: '2023-10-28',
      access: 'public',
    },
    {
      id: 'ds-1003',
      title: 'Genomic Data - Cancer Research',
      description: 'Genomic sequencing data for oncology research',
      category: 'Genomics',
      records: 342,
      lastUpdated: '2023-11-05',
      access: 'restricted',
    },
  ];

  const researchProjects: ResearchProject[] = [
    {
      id: 'proj-2001',
      title: 'Efficacy of New Antiviral Drug',
      status: 'active',
      lastModified: '2023-11-10',
      collaborators: 3,
    },
    {
      id: 'proj-2002',
      title: 'Long-term Effects of Statins',
      status: 'active',
      lastModified: '2023-11-05',
      collaborators: 5,
    },
    {
      id: 'proj-2003',
      title: 'Rare Disease Genomic Analysis',
      status: 'draft',
      lastModified: '2023-10-22',
      collaborators: 2,
    },
  ];

  const stats = [
    { name: 'Total Datasets', value: '24', icon: DocumentTextIcon },
    { name: 'Research Projects', value: '5', icon: ChartBarIcon },
    { name: 'Collaborators', value: '12', icon: UserGroupIcon },
    { name: 'Published Papers', value: '3', icon: DocumentArrowDownIcon },
  ];

  const handleDatasetClick = (datasetId: string) => {
    router.push(`/researcher/datasets/${datasetId}`);
  };

  const handleNewProject = () => {
    router.push('/researcher/projects/new');
  };

  const filteredDatasets = recentDatasets.filter(dataset =>
    dataset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dataset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dataset.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Researcher Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Search datasets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <stat.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Datasets */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Recent Datasets</h2>
              <Link 
                href="/researcher/datasets" 
                className="text-sm font-medium text-primary hover:text-primary/80"
              >
                View all
              </Link>
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <ul className="divide-y divide-gray-200">
                {filteredDatasets.map((dataset) => (
                  <li key={dataset.id}>
                    <div 
                      className="block hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleDatasetClick(dataset.id)}
                    >
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-primary truncate">{dataset.title}</p>
                          <div className="ml-2 flex-shrink-0 flex">
                            <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              dataset.access === 'public' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {dataset.access}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              {dataset.description}
                            </p>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <p>
                              {dataset.records.toLocaleString()} records • {dataset.category}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="text-xs text-gray-500">
                            Last updated {new Date(dataset.lastUpdated).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Research Projects */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Research Projects</h2>
              <button
                type="button"
                onClick={handleNewProject}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                New Project
              </button>
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <ul className="divide-y divide-gray-200">
                {researchProjects.map((project) => (
                  <li key={project.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-primary truncate">{project.title}</p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            project.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : project.status === 'completed'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {project.status}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            {project.collaborators} {project.collaborators === 1 ? 'collaborator' : 'collaborators'}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <span>Last modified {new Date(project.lastModified).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  className="relative bg-white p-4 border border-gray-200 rounded-lg shadow-sm flex items-start hover:border-primary"
                >
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-100 text-blue-600">
                    <ArrowUpTrayIcon className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Upload Dataset</h3>
                    <p className="mt-1 text-xs text-gray-500">Share your research data</p>
                  </div>
                </button>
                <button
                  type="button"
                  className="relative bg-white p-4 border border-gray-200 rounded-lg shadow-sm flex items-start hover:border-primary"
                >
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-green-100 text-green-600">
                    <ChartPieIcon className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">View Analytics</h3>
                    <p className="mt-1 text-xs text-gray-500">Analyze your research data</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
