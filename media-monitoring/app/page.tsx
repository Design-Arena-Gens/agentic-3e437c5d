"use client";

import { useState } from 'react';
import { Search, Video, Radio, Tv, FileText, Clock, AlertCircle, CheckCircle, Users, BarChart3, Settings, Plus, Filter, Download, Eye, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

type MediaType = 'tv' | 'radio' | 'web' | 'podcast';
type Priority = 'high' | 'medium' | 'low';
type Status = 'pending' | 'in-progress' | 'completed' | 'archived';

interface MediaItem {
  id: string;
  title: string;
  source: string;
  mediaType: MediaType;
  date: Date;
  duration: string;
  priority: Priority;
  status: Status;
  keywords: string[];
  summary: string;
  assignedTo?: string;
  url?: string;
}

const MEDIA_TYPES = {
  tv: { icon: Tv, label: 'Télévision', color: 'bg-blue-100 text-blue-800' },
  radio: { icon: Radio, label: 'Radio', color: 'bg-green-100 text-green-800' },
  web: { icon: Video, label: 'Web/Streaming', color: 'bg-purple-100 text-purple-800' },
  podcast: { icon: FileText, label: 'Podcast', color: 'bg-orange-100 text-orange-800' },
};

const PRIORITY_COLORS = {
  high: 'bg-red-100 text-red-800 border-red-300',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  low: 'bg-gray-100 text-gray-800 border-gray-300',
};

const STATUS_CONFIG = {
  pending: { icon: Clock, label: 'En attente', color: 'bg-gray-100 text-gray-800' },
  'in-progress': { icon: AlertCircle, label: 'En cours', color: 'bg-blue-100 text-blue-800' },
  completed: { icon: CheckCircle, label: 'Terminé', color: 'bg-green-100 text-green-800' },
  archived: { icon: FileText, label: 'Archivé', color: 'bg-gray-100 text-gray-600' },
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'media' | 'analytics' | 'manual'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<MediaType | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<Status | 'all'>('all');
  const [showAddForm, setShowAddForm] = useState(false);

  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    {
      id: '1',
      title: 'Journal télévisé - Édition du soir',
      source: 'France 2',
      mediaType: 'tv',
      date: new Date(),
      duration: '35:00',
      priority: 'high',
      status: 'pending',
      keywords: ['actualité', 'politique', 'économie'],
      summary: 'Édition principale du journal télévisé avec les dernières actualités nationales et internationales.',
      assignedTo: 'Jean Dupont',
    },
    {
      id: '2',
      title: 'Interview matinale',
      source: 'RTL',
      mediaType: 'radio',
      date: new Date(),
      duration: '15:30',
      priority: 'medium',
      status: 'in-progress',
      keywords: ['interview', 'politique'],
      summary: 'Interview d\'un ministre sur les réformes en cours.',
      assignedTo: 'Marie Martin',
    },
    {
      id: '3',
      title: 'Débat en ligne',
      source: 'YouTube - Chaîne Politique',
      mediaType: 'web',
      date: new Date(Date.now() - 86400000),
      duration: '1:25:00',
      priority: 'low',
      status: 'completed',
      keywords: ['débat', 'société', 'environnement'],
      summary: 'Débat entre experts sur les questions environnementales.',
      assignedTo: 'Pierre Durand',
    },
  ]);

  const filteredItems = mediaItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || item.mediaType === filterType;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: mediaItems.length,
    pending: mediaItems.filter(i => i.status === 'pending').length,
    inProgress: mediaItems.filter(i => i.status === 'in-progress').length,
    completed: mediaItems.filter(i => i.status === 'completed').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Video className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Manuel de Veille Médiatique</h1>
                <p className="text-sm text-gray-600">Système de gestion audiovisuelle</p>
              </div>
            </div>
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              <Plus className="h-5 w-5" />
              <span>Nouvelle entrée</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Tableau de bord', icon: BarChart3 },
              { id: 'media', label: 'Médias', icon: Video },
              { id: 'analytics', label: 'Statistiques', icon: BarChart3 },
              { id: 'manual', label: 'Manuel', icon: FileText },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                  <Video className="h-12 w-12 text-blue-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">En attente</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.pending}</p>
                  </div>
                  <Clock className="h-12 w-12 text-yellow-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">En cours</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.inProgress}</p>
                  </div>
                  <AlertCircle className="h-12 w-12 text-blue-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Terminés</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.completed}</p>
                  </div>
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher par titre, source, ou mots-clés..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Tous les types</option>
                  <option value="tv">Télévision</option>
                  <option value="radio">Radio</option>
                  <option value="web">Web/Streaming</option>
                  <option value="podcast">Podcast</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="pending">En attente</option>
                  <option value="in-progress">En cours</option>
                  <option value="completed">Terminé</option>
                  <option value="archived">Archivé</option>
                </select>
              </div>
            </div>

            {/* Media Items List */}
            <div className="space-y-4">
              {filteredItems.map(item => {
                const MediaIcon = MEDIA_TYPES[item.mediaType].icon;
                const StatusIcon = STATUS_CONFIG[item.status].icon;

                return (
                  <div key={item.id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-lg ${MEDIA_TYPES[item.mediaType].color}`}>
                            <MediaIcon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                              <span className={`px-2 py-1 text-xs font-medium rounded border ${PRIORITY_COLORS[item.priority]}`}>
                                {item.priority === 'high' ? 'Haute' : item.priority === 'medium' ? 'Moyenne' : 'Basse'}
                              </span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                              <span className="flex items-center space-x-1">
                                <MediaIcon className="h-4 w-4" />
                                <span>{item.source}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{item.duration}</span>
                              </span>
                              <span>{format(item.date, 'PPP', { locale: fr })}</span>
                              {item.assignedTo && (
                                <span className="flex items-center space-x-1">
                                  <Users className="h-4 w-4" />
                                  <span>{item.assignedTo}</span>
                                </span>
                              )}
                            </div>
                            <p className="text-gray-700 mb-3">{item.summary}</p>
                            <div className="flex items-center space-x-2">
                              {item.keywords.map((keyword, idx) => (
                                <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-3">
                        <span className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${STATUS_CONFIG[item.status].color}`}>
                          <StatusIcon className="h-4 w-4" />
                          <span>{STATUS_CONFIG[item.status].label}</span>
                        </span>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                            <Eye className="h-5 w-5" />
                          </button>
                          <button className="p-2 text-gray-600 hover:bg-gray-50 rounded">
                            <Edit className="h-5 w-5" />
                          </button>
                          <button className="p-2 text-gray-600 hover:bg-gray-50 rounded">
                            <Download className="h-5 w-5" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'manual' && (
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Manuel de Veille Médiatique Audiovisuelle</h2>

            <div className="prose max-w-none space-y-8">
              <section>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h3>
                <p className="text-gray-700 mb-4">
                  Ce manuel décrit les procédures et meilleures pratiques pour gérer efficacement un service de veille médiatique audiovisuelle.
                  Il couvre l'ensemble du processus, de la collecte à l'analyse et la distribution des contenus médiatiques.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">2. Objectifs de la Veille Médiatique</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Surveiller la couverture médiatique sur des sujets spécifiques</li>
                  <li>Identifier les tendances et les narratifs émergents</li>
                  <li>Analyser le ton et le sentiment des contenus</li>
                  <li>Évaluer la portée et l'impact des messages</li>
                  <li>Fournir des rapports d'analyse aux parties prenantes</li>
                </ul>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">3. Processus de Collecte</h3>

                <h4 className="text-xl font-semibold text-gray-800 mb-3">3.1 Sources à Surveiller</h4>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li><strong>Télévision :</strong> JT nationaux, émissions d'actualité, débats politiques</li>
                    <li><strong>Radio :</strong> Matinales, interviews, chroniques</li>
                    <li><strong>Web/Streaming :</strong> Plateformes vidéo, chaînes d'information en continu</li>
                    <li><strong>Podcasts :</strong> Émissions spécialisées, interviews approfondies</li>
                  </ul>
                </div>

                <h4 className="text-xl font-semibold text-gray-800 mb-3">3.2 Méthodes de Collecte</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Enregistrement automatique via EPG (Electronic Program Guide)</li>
                  <li>Capture manuelle pour contenus ad-hoc</li>
                  <li>Abonnements aux flux RSS et alertes</li>
                  <li>Téléchargement depuis plateformes de replay</li>
                </ul>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">4. Classification et Métadonnées</h3>

                <h4 className="text-xl font-semibold text-gray-800 mb-3">4.1 Informations Essentielles</h4>
                <div className="bg-green-50 p-4 rounded-lg mb-4">
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li><strong>Titre :</strong> Nom de l'émission ou du segment</li>
                    <li><strong>Source :</strong> Chaîne, station ou plateforme</li>
                    <li><strong>Date et heure :</strong> Moment de diffusion</li>
                    <li><strong>Durée :</strong> Temps total du contenu</li>
                    <li><strong>Type de média :</strong> TV, radio, web, podcast</li>
                  </ul>
                </div>

                <h4 className="text-xl font-semibold text-gray-800 mb-3">4.2 Mots-clés et Tags</h4>
                <p className="text-gray-700 mb-4">
                  Utiliser un système de tagging cohérent pour faciliter la recherche :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Thèmes principaux (politique, économie, société, environnement)</li>
                  <li>Personnalités mentionnées</li>
                  <li>Organisations et entreprises</li>
                  <li>Événements spécifiques</li>
                  <li>Zones géographiques</li>
                </ul>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">5. Analyse de Contenu</h3>

                <h4 className="text-xl font-semibold text-gray-800 mb-3">5.1 Éléments à Analyser</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Messages principaux :</strong> Quels sont les points clés ?</li>
                  <li><strong>Ton et sentiment :</strong> Positif, négatif, neutre</li>
                  <li><strong>Angle éditorial :</strong> Perspective adoptée par le média</li>
                  <li><strong>Temps d'antenne :</strong> Durée accordée au sujet</li>
                  <li><strong>Intervenants :</strong> Qui parle et quelle est leur position ?</li>
                </ul>

                <h4 className="text-xl font-semibold text-gray-800 mb-3">5.2 Niveaux de Priorité</h4>
                <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li><strong>Haute :</strong> Couverture majeure, prime time, impact significatif</li>
                    <li><strong>Moyenne :</strong> Mention substantielle, émissions secondaires</li>
                    <li><strong>Basse :</strong> Mention brève, faible audience</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">6. Workflow de Traitement</h3>

                <h4 className="text-xl font-semibold text-gray-800 mb-3">6.1 États de Traitement</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-yellow-600 mt-1" />
                    <div>
                      <strong className="text-gray-900">En attente :</strong>
                      <p className="text-gray-700">Contenu collecté, en attente d'analyse</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <strong className="text-gray-900">En cours :</strong>
                      <p className="text-gray-700">Analyse en cours par un membre de l'équipe</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <strong className="text-gray-900">Terminé :</strong>
                      <p className="text-gray-700">Analyse complète, prêt pour rapport</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FileText className="h-5 w-5 text-gray-600 mt-1" />
                    <div>
                      <strong className="text-gray-900">Archivé :</strong>
                      <p className="text-gray-700">Stocké pour référence future</p>
                    </div>
                  </div>
                </div>

                <h4 className="text-xl font-semibold text-gray-800 mb-3 mt-6">6.2 Assignation des Tâches</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Assigner chaque contenu à un analyste responsable</li>
                  <li>Définir des délais de traitement selon la priorité</li>
                  <li>Équilibrer la charge de travail entre les membres</li>
                  <li>Suivre l'avancement en temps réel</li>
                </ul>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">7. Rapports et Livrables</h3>

                <h4 className="text-xl font-semibold text-gray-800 mb-3">7.1 Types de Rapports</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Quotidiens :</strong> Synthèse des principales mentions</li>
                  <li><strong>Hebdomadaires :</strong> Analyse des tendances et comparaisons</li>
                  <li><strong>Mensuels :</strong> Rapport complet avec statistiques et graphiques</li>
                  <li><strong>Ad-hoc :</strong> Analyses spécifiques sur demande</li>
                </ul>

                <h4 className="text-xl font-semibold text-gray-800 mb-3">7.2 Éléments du Rapport</h4>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Résumé exécutif</li>
                    <li>Volume de couverture par média</li>
                    <li>Analyse du sentiment</li>
                    <li>Messages clés identifiés</li>
                    <li>Recommandations stratégiques</li>
                    <li>Extraits audio/vidéo pertinents</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">8. Outils et Technologies</h3>

                <h4 className="text-xl font-semibold text-gray-800 mb-3">8.1 Outils Recommandés</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Enregistrement :</strong> Systèmes DVR, logiciels de capture</li>
                  <li><strong>Transcription :</strong> Outils de speech-to-text automatique</li>
                  <li><strong>Analyse :</strong> Solutions de text mining et sentiment analysis</li>
                  <li><strong>Stockage :</strong> Serveurs dédiés, cloud storage</li>
                  <li><strong>Gestion :</strong> Système de gestion de contenu médiatique</li>
                </ul>

                <h4 className="text-xl font-semibold text-gray-800 mb-3">8.2 Automatisation</h4>
                <p className="text-gray-700 mb-4">
                  Automatiser les tâches répétitives pour gagner en efficacité :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Alertes automatiques sur mots-clés</li>
                  <li>Transcription automatique</li>
                  <li>Classification préliminaire par IA</li>
                  <li>Génération automatique de statistiques</li>
                </ul>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">9. Aspects Légaux et Éthiques</h3>

                <h4 className="text-xl font-semibold text-gray-800 mb-3">9.1 Droits d'Auteur</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Respecter les droits de diffusion et reproduction</li>
                  <li>Utiliser les contenus dans le cadre légal autorisé</li>
                  <li>Citer correctement les sources</li>
                  <li>Obtenir les autorisations nécessaires pour distribution</li>
                </ul>

                <h4 className="text-xl font-semibold text-gray-800 mb-3">9.2 Protection des Données</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Sécuriser l'accès aux contenus et analyses</li>
                  <li>Respecter la confidentialité des informations</li>
                  <li>Conformité RGPD pour données personnelles</li>
                  <li>Politique de rétention et suppression des archives</li>
                </ul>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">10. Bonnes Pratiques</h3>

                <div className="bg-indigo-50 p-6 rounded-lg">
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li><strong>Cohérence :</strong> Utiliser des nomenclatures standardisées</li>
                    <li><strong>Rapidité :</strong> Traiter les contenus prioritaires immédiatement</li>
                    <li><strong>Objectivité :</strong> Maintenir une analyse neutre et factuelle</li>
                    <li><strong>Collaboration :</strong> Partager les insights entre analystes</li>
                    <li><strong>Documentation :</strong> Conserver traces et justifications</li>
                    <li><strong>Formation continue :</strong> Se tenir à jour sur les outils et méthodes</li>
                    <li><strong>Qualité :</strong> Vérifier et valider avant diffusion</li>
                    <li><strong>Réactivité :</strong> Adapter le processus aux besoins émergents</li>
                  </ul>
                </div>
              </section>

              <section className="mt-8 pt-8 border-t">
                <div className="bg-gray-100 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Contacts et Support</h3>
                  <p className="text-gray-700 mb-2">
                    Pour toute question concernant l'utilisation de ce système ou pour signaler un problème :
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Support technique : support@veille-media.fr</li>
                    <li>Responsable de service : chef.veille@veille-media.fr</li>
                    <li>Documentation complète : docs.veille-media.fr</li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Statistiques de Veille</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-4">Répartition par Type de Média</h3>
                  <div className="space-y-3">
                    {Object.entries(MEDIA_TYPES).map(([key, value]) => {
                      const count = mediaItems.filter(i => i.mediaType === key).length;
                      const percentage = (count / mediaItems.length * 100).toFixed(0);
                      return (
                        <div key={key}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-700">{value.label}</span>
                            <span className="text-sm font-semibold">{count} ({percentage}%)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-4">Répartition par Statut</h3>
                  <div className="space-y-3">
                    {Object.entries(STATUS_CONFIG).map(([key, value]) => {
                      const count = mediaItems.filter(i => i.status === key).length;
                      const percentage = (count / mediaItems.length * 100).toFixed(0);
                      return (
                        <div key={key}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-700">{value.label}</span>
                            <span className="text-sm font-semibold">{count} ({percentage}%)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
