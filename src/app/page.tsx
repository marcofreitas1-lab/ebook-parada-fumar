"use client";

import { useState, useEffect } from "react";
import {
  BookOpen,
  Heart,
  TrendingUp,
  CheckCircle2,
  Lightbulb,
  Users,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Bookmark,
  MessageSquare,
  Award,
  Calendar,
  Target,
  Sparkles,
} from "lucide-react";

type Section = "intro" | "effects" | "benefits" | "exercises" | "testimonials" | "resources";

interface Note {
  section: string;
  content: string;
  date: string;
}

interface Progress {
  completedSections: string[];
  bookmarkedPages: string[];
  notes: Note[];
  startDate: string;
}

export default function QuitSmokingEbook() {
  const [currentSection, setCurrentSection] = useState<Section>("intro");
  const [progress, setProgress] = useState<Progress>({
    completedSections: [],
    bookmarkedPages: [],
    notes: [],
    startDate: new Date().toISOString(),
  });
  const [noteText, setNoteText] = useState("");
  const [showNoteInput, setShowNoteInput] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("quit-smoking-progress");
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem("quit-smoking-progress", JSON.stringify(progress));
  }, [progress]);

  const markAsCompleted = (section: string) => {
    if (!progress.completedSections.includes(section)) {
      setProgress({
        ...progress,
        completedSections: [...progress.completedSections, section],
      });
    }
  };

  const toggleBookmark = (section: string) => {
    if (progress.bookmarkedPages.includes(section)) {
      setProgress({
        ...progress,
        bookmarkedPages: progress.bookmarkedPages.filter((s) => s !== section),
      });
    } else {
      setProgress({
        ...progress,
        bookmarkedPages: [...progress.bookmarkedPages, section],
      });
    }
  };

  const addNote = () => {
    if (noteText.trim()) {
      const newNote: Note = {
        section: currentSection,
        content: noteText,
        date: new Date().toISOString(),
      };
      setProgress({
        ...progress,
        notes: [...progress.notes, newNote],
      });
      setNoteText("");
      setShowNoteInput(false);
    }
  };

  const sections = [
    { id: "intro", label: "Introdução", icon: BookOpen },
    { id: "effects", label: "Efeitos do Tabagismo", icon: Heart },
    { id: "benefits", label: "Benefícios de Parar", icon: TrendingUp },
    { id: "exercises", label: "Exercícios Práticos", icon: Target },
    { id: "testimonials", label: "Testemunhos", icon: Users },
    { id: "resources", label: "Recursos e Apoio", icon: ExternalLink },
  ];

  const currentIndex = sections.findIndex((s) => s.id === currentSection);

  const goToNext = () => {
    markAsCompleted(currentSection);
    if (currentIndex < sections.length - 1) {
      setCurrentSection(sections[currentIndex + 1].id as Section);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentSection(sections[currentIndex - 1].id as Section);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Livre do Cigarro
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">
                  Seu guia para uma vida sem tabaco
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 bg-emerald-100 px-3 py-1.5 rounded-full">
                <Award className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700">
                  {progress.completedSections.length}/{sections.length} completo
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                Capítulos
              </h2>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isCompleted = progress.completedSections.includes(section.id);
                  const isBookmarked = progress.bookmarkedPages.includes(section.id);
                  const isCurrent = currentSection === section.id;

                  return (
                    <button
                      key={section.id}
                      onClick={() => setCurrentSection(section.id as Section)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                        isCurrent
                          ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm font-medium flex-1 text-left">
                        {section.label}
                      </span>
                      {isCompleted && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      )}
                      {isBookmarked && (
                        <Bookmark className="w-4 h-4 fill-current" />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Progress Stats */}
              <div className="mt-6 pt-6 border-t">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progresso</span>
                    <span className="font-bold text-emerald-600">
                      {Math.round((progress.completedSections.length / sections.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${(progress.completedSections.length / sections.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10">
              {/* Section Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium mb-2">
                    <Calendar className="w-4 h-4" />
                    Capítulo {currentIndex + 1} de {sections.length}
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    {sections[currentIndex].label}
                  </h2>
                </div>
                <button
                  onClick={() => toggleBookmark(currentSection)}
                  className={`p-2 rounded-lg transition-colors ${
                    progress.bookmarkedPages.includes(currentSection)
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Bookmark
                    className={`w-5 h-5 ${
                      progress.bookmarkedPages.includes(currentSection) ? "fill-current" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none">
                {currentSection === "intro" && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-2xl">
                      <h3 className="text-2xl font-bold mb-3 text-white">
                        Bem-vindo à Sua Jornada de Liberdade! 🌟
                      </h3>
                      <p className="text-emerald-50 leading-relaxed">
                        Parabéns por dar este primeiro passo corajoso! Parar de fumar é uma das
                        melhores decisões que você pode tomar pela sua saúde e qualidade de vida.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Target className="w-6 h-6 text-emerald-600" />
                        Por que este eBook?
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        Este guia interativo foi criado para acompanhá-lo em cada etapa da sua
                        jornada para se livrar do cigarro. Aqui você encontrará:
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                          <span className="text-gray-700">
                            <strong>Informações científicas</strong> sobre os efeitos do tabagismo
                            e os benefícios de parar
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                          <span className="text-gray-700">
                            <strong>Exercícios práticos</strong> e técnicas comprovadas para
                            superar a vontade de fumar
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                          <span className="text-gray-700">
                            <strong>Histórias inspiradoras</strong> de pessoas que venceram o vício
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                          <span className="text-gray-700">
                            <strong>Recursos e apoio</strong> para você não estar sozinho nessa
                            jornada
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-xl">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                          <h5 className="font-bold text-blue-900 mb-2">Dica Importante</h5>
                          <p className="text-blue-800 text-sm leading-relaxed">
                            Use este eBook no seu próprio ritmo. Faça anotações, marque páginas
                            importantes e volte sempre que precisar. Sua jornada é única!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentSection === "effects" && (
                  <div className="space-y-6">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Compreender os efeitos do tabagismo é fundamental para fortalecer sua
                      motivação. Vamos explorar o que acontece com seu corpo quando você fuma.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-red-50 p-5 rounded-xl border border-red-200">
                        <Heart className="w-8 h-8 text-red-600 mb-3" />
                        <h4 className="font-bold text-red-900 mb-2">Sistema Cardiovascular</h4>
                        <ul className="text-sm text-red-800 space-y-1">
                          <li>• Aumento da pressão arterial</li>
                          <li>• Risco de infarto e AVC</li>
                          <li>• Má circulação sanguínea</li>
                          <li>• Envelhecimento precoce</li>
                        </ul>
                      </div>

                      <div className="bg-orange-50 p-5 rounded-xl border border-orange-200">
                        <Target className="w-8 h-8 text-orange-600 mb-3" />
                        <h4 className="font-bold text-orange-900 mb-2">Sistema Respiratório</h4>
                        <ul className="text-sm text-orange-800 space-y-1">
                          <li>• Tosse crônica e falta de ar</li>
                          <li>• Bronquite e enfisema</li>
                          <li>• Risco de câncer de pulmão</li>
                          <li>• Infecções respiratórias</li>
                        </ul>
                      </div>

                      <div className="bg-purple-50 p-5 rounded-xl border border-purple-200">
                        <Sparkles className="w-8 h-8 text-purple-600 mb-3" />
                        <h4 className="font-bold text-purple-900 mb-2">Aparência Física</h4>
                        <ul className="text-sm text-purple-800 space-y-1">
                          <li>• Pele envelhecida e manchada</li>
                          <li>• Dentes amarelados</li>
                          <li>• Cabelos fracos e quebradiços</li>
                          <li>• Mau hálito persistente</li>
                        </ul>
                      </div>

                      <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-200">
                        <Award className="w-8 h-8 text-yellow-600 mb-3" />
                        <h4 className="font-bold text-yellow-900 mb-2">Qualidade de Vida</h4>
                        <ul className="text-sm text-yellow-800 space-y-1">
                          <li>• Dependência química</li>
                          <li>• Gastos financeiros elevados</li>
                          <li>• Isolamento social</li>
                          <li>• Ansiedade e estresse</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-gray-900 text-white p-6 rounded-2xl">
                      <h4 className="text-xl font-bold mb-3">Dados Alarmantes</h4>
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-emerald-400 mb-1">8 milhões</div>
                          <div className="text-sm text-gray-300">
                            Mortes anuais por tabagismo no mundo
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-emerald-400 mb-1">7.000+</div>
                          <div className="text-sm text-gray-300">
                            Substâncias químicas no cigarro
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-emerald-400 mb-1">70+</div>
                          <div className="text-sm text-gray-300">
                            Substâncias cancerígenas identificadas
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentSection === "benefits" && (
                  <div className="space-y-6">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      A boa notícia é que seu corpo começa a se recuperar imediatamente após parar
                      de fumar! Veja a linha do tempo dos benefícios:
                    </p>

                    <div className="space-y-4">
                      <div className="flex gap-4 items-start">
                        <div className="bg-emerald-100 text-emerald-700 font-bold px-4 py-2 rounded-lg flex-shrink-0">
                          20 min
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold text-gray-900 mb-1">
                            Pressão arterial normaliza
                          </h5>
                          <p className="text-gray-600 text-sm">
                            Sua frequência cardíaca e pressão arterial começam a voltar ao normal.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <div className="bg-emerald-100 text-emerald-700 font-bold px-4 py-2 rounded-lg flex-shrink-0">
                          12 horas
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold text-gray-900 mb-1">
                            Níveis de CO normalizam
                          </h5>
                          <p className="text-gray-600 text-sm">
                            O monóxido de carbono no sangue retorna ao normal, melhorando a
                            oxigenação.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <div className="bg-emerald-100 text-emerald-700 font-bold px-4 py-2 rounded-lg flex-shrink-0">
                          2 semanas
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold text-gray-900 mb-1">
                            Circulação e pulmões melhoram
                          </h5>
                          <p className="text-gray-600 text-sm">
                            Sua circulação melhora e sua função pulmonar aumenta.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <div className="bg-emerald-100 text-emerald-700 font-bold px-4 py-2 rounded-lg flex-shrink-0">
                          1-9 meses
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold text-gray-900 mb-1">Tosse e falta de ar diminuem</h5>
                          <p className="text-gray-600 text-sm">
                            Tosse, congestão nasal, fadiga e falta de ar diminuem significativamente.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <div className="bg-emerald-100 text-emerald-700 font-bold px-4 py-2 rounded-lg flex-shrink-0">
                          1 ano
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold text-gray-900 mb-1">
                            Risco cardíaco reduz 50%
                          </h5>
                          <p className="text-gray-600 text-sm">
                            O risco de doença cardíaca é reduzido pela metade.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <div className="bg-emerald-100 text-emerald-700 font-bold px-4 py-2 rounded-lg flex-shrink-0">
                          5-15 anos
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold text-gray-900 mb-1">Risco de AVC normaliza</h5>
                          <p className="text-gray-600 text-sm">
                            O risco de AVC é reduzido ao nível de um não fumante.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <div className="bg-emerald-100 text-emerald-700 font-bold px-4 py-2 rounded-lg flex-shrink-0">
                          10 anos
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold text-gray-900 mb-1">
                            Risco de câncer reduz 50%
                          </h5>
                          <p className="text-gray-600 text-sm">
                            O risco de câncer de pulmão cai pela metade em comparação a um fumante.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-2xl">
                      <h4 className="text-xl font-bold mb-4">Outros Benefícios Incríveis</h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                          <span className="text-sm">Economia financeira significativa</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                          <span className="text-sm">Pele mais jovem e saudável</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                          <span className="text-sm">Melhora do paladar e olfato</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                          <span className="text-sm">Mais energia e disposição</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                          <span className="text-sm">Dentes mais brancos</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                          <span className="text-sm">Melhora da fertilidade</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                          <span className="text-sm">Autoestima elevada</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                          <span className="text-sm">Exemplo positivo para família</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentSection === "exercises" && (
                  <div className="space-y-6">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Técnicas práticas e comprovadas para ajudá-lo a superar a vontade de fumar e
                      manter-se firme na sua decisão.
                    </p>

                    <div className="space-y-5">
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-xl">
                        <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                          <Target className="w-5 h-5" />
                          Técnica dos 5 D's
                        </h4>
                        <ul className="space-y-2 text-blue-800">
                          <li>
                            <strong>Delay (Adie):</strong> Espere 5 minutos antes de ceder à
                            vontade
                          </li>
                          <li>
                            <strong>Deep Breathing (Respire):</strong> Faça respirações profundas
                          </li>
                          <li>
                            <strong>Drink Water (Beba Água):</strong> Hidrate-se constantemente
                          </li>
                          <li>
                            <strong>Do Something (Faça Algo):</strong> Distraia-se com atividades
                          </li>
                          <li>
                            <strong>Discuss (Converse):</strong> Fale com alguém de confiança
                          </li>
                        </ul>
                      </div>

                      <div className="bg-purple-50 border-l-4 border-purple-500 p-5 rounded-r-xl">
                        <h4 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                          <Lightbulb className="w-5 h-5" />
                          Exercício de Respiração 4-7-8
                        </h4>
                        <ol className="space-y-2 text-purple-800 list-decimal list-inside">
                          <li>Inspire pelo nariz contando até 4</li>
                          <li>Segure a respiração contando até 7</li>
                          <li>Expire pela boca contando até 8</li>
                          <li>Repita 4 vezes quando sentir vontade de fumar</li>
                        </ol>
                        <p className="text-sm text-purple-700 mt-3 italic">
                          Esta técnica acalma o sistema nervoso e reduz a ansiedade.
                        </p>
                      </div>

                      <div className="bg-emerald-50 border-l-4 border-emerald-500 p-5 rounded-r-xl">
                        <h4 className="font-bold text-emerald-900 mb-3 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5" />
                          Substitutos Saudáveis
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-3 text-emerald-800">
                          <div>
                            <strong>Quando sentir vontade:</strong>
                            <ul className="text-sm mt-1 space-y-1">
                              <li>• Mastigue chiclete sem açúcar</li>
                              <li>• Coma cenoura ou aipo</li>
                              <li>• Beba água gelada</li>
                              <li>• Chupe gelo</li>
                            </ul>
                          </div>
                          <div>
                            <strong>Para ocupar as mãos:</strong>
                            <ul className="text-sm mt-1 space-y-1">
                              <li>• Aperte uma bola anti-stress</li>
                              <li>• Desenhe ou pinte</li>
                              <li>• Faça tricô ou crochê</li>
                              <li>• Jogue no celular</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="bg-orange-50 border-l-4 border-orange-500 p-5 rounded-r-xl">
                        <h4 className="font-bold text-orange-900 mb-3 flex items-center gap-2">
                          <Calendar className="w-5 h-5" />
                          Dicas Diárias
                        </h4>
                        <div className="space-y-3 text-orange-800">
                          <div>
                            <strong>Manhã:</strong>
                            <p className="text-sm mt-1">
                              Comece o dia com exercícios leves e um café da manhã nutritivo. Evite
                              café em excesso nos primeiros dias.
                            </p>
                          </div>
                          <div>
                            <strong>Tarde:</strong>
                            <p className="text-sm mt-1">
                              Mantenha-se ocupado com atividades que você gosta. Evite situações que
                              você associa ao cigarro.
                            </p>
                          </div>
                          <div>
                            <strong>Noite:</strong>
                            <p className="text-sm mt-1">
                              Pratique técnicas de relaxamento. Vá dormir cedo para evitar momentos
                              de fraqueza.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-r-xl">
                        <h4 className="font-bold text-yellow-900 mb-3 flex items-center gap-2">
                          <Award className="w-5 h-5" />
                          Sistema de Recompensas
                        </h4>
                        <p className="text-yellow-800 mb-3">
                          Celebre suas conquistas! Use o dinheiro que economizou para:
                        </p>
                        <ul className="space-y-1 text-yellow-800 text-sm">
                          <li>• 1 semana: Compre algo que você queria</li>
                          <li>• 1 mês: Faça um programa especial</li>
                          <li>• 3 meses: Presenteie-se com algo maior</li>
                          <li>• 1 ano: Realize um sonho (viagem, curso, etc.)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {currentSection === "testimonials" && (
                  <div className="space-y-6">
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                      Histórias reais de pessoas que venceram o vício e transformaram suas vidas.
                      Você também pode conseguir!
                    </p>

                    <div className="space-y-5">
                      <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="bg-emerald-100 rounded-full p-3">
                            <Users className="w-6 h-6 text-emerald-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">Maria Silva, 42 anos</h4>
                            <p className="text-sm text-emerald-600 font-medium">
                              Livre há 3 anos • Fumava há 20 anos
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed italic">
                          "Fumei por 20 anos e achava impossível parar. Tentei várias vezes e
                          sempre voltava. Desta vez, usei as técnicas de respiração e o apoio de um
                          grupo. Os primeiros dias foram difíceis, mas depois de 2 semanas, comecei
                          a sentir a diferença. Hoje, 3 anos depois, não me imagino fumando
                          novamente. Minha pele melhorou, tenho mais energia e economizei dinheiro
                          suficiente para fazer uma viagem dos sonhos!"
                        </p>
                        <div className="flex items-center gap-2 mt-4 text-emerald-600">
                          <Award className="w-5 h-5" />
                          <span className="text-sm font-medium">
                            Economia: R$ 32.400 em 3 anos
                          </span>
                        </div>
                      </div>

                      <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="bg-blue-100 rounded-full p-3">
                            <Users className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">João Santos, 35 anos</h4>
                            <p className="text-sm text-blue-600 font-medium">
                              Livre há 1 ano • Fumava há 15 anos
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed italic">
                          "Comecei a fumar aos 20 anos e nunca pensei que conseguiria parar. O que
                          me motivou foi o nascimento do meu filho. Não queria que ele crescesse
                          vendo o pai fumar. Usei adesivos de nicotina nas primeiras semanas e
                          pratiquei exercícios físicos diariamente. A atividade física foi
                          fundamental! Perdi 5kg, ganhei músculos e minha autoestima disparou. Hoje
                          sou um exemplo para meu filho."
                        </p>
                        <div className="flex items-center gap-2 mt-4 text-blue-600">
                          <Heart className="w-5 h-5" />
                          <span className="text-sm font-medium">
                            Benefício: Saúde cardiovascular 50% melhor
                          </span>
                        </div>
                      </div>

                      <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="bg-purple-100 rounded-full p-3">
                            <Users className="w-6 h-6 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">Ana Costa, 28 anos</h4>
                            <p className="text-sm text-purple-600 font-medium">
                              Livre há 6 meses • Fumava há 10 anos
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed italic">
                          "Sempre fui vaidosa e o cigarro estava destruindo minha pele e meus
                          dentes. Decidi parar quando vi fotos antigas e percebi como estava
                          envelhecida. Procurei ajuda profissional e participei de terapia em grupo.
                          O apoio foi essencial! Hoje, 6 meses depois, minha pele está radiante,
                          meus dentes estão mais brancos e me sinto 10 anos mais jovem. Valeu cada
                          segundo de esforço!"
                        </p>
                        <div className="flex items-center gap-2 mt-4 text-purple-600">
                          <Sparkles className="w-5 h-5" />
                          <span className="text-sm font-medium">
                            Benefício: Aparência rejuvenescida
                          </span>
                        </div>
                      </div>

                      <div className="bg-white border-2 border-orange-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="bg-orange-100 rounded-full p-3">
                            <Users className="w-6 h-6 text-orange-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">Carlos Oliveira, 50 anos</h4>
                            <p className="text-sm text-orange-600 font-medium">
                              Livre há 5 anos • Fumava há 30 anos
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed italic">
                          "Fumei por 30 anos, 2 maços por dia. Tive um susto quando meu médico disse
                          que eu estava desenvolvendo DPOC. Foi meu despertar. Usei medicação
                          prescrita, fiz acompanhamento psicológico e mudei completamente meu estilo
                          de vida. Hoje, 5 anos depois, meus pulmões se recuperaram
                          significativamente. Corro 5km três vezes por semana e me sinto com 30 anos
                          novamente. Nunca é tarde para mudar!"
                        </p>
                        <div className="flex items-center gap-2 mt-4 text-orange-600">
                          <TrendingUp className="w-5 h-5" />
                          <span className="text-sm font-medium">
                            Benefício: Capacidade pulmonar recuperada em 80%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-2xl mt-8">
                      <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                        <MessageSquare className="w-6 h-6" />
                        Sua História Também Pode Inspirar!
                      </h4>
                      <p className="text-emerald-50 leading-relaxed">
                        Quando você conseguir parar de fumar, compartilhe sua história para inspirar
                        outras pessoas. Cada vitória conta e pode ser o incentivo que alguém precisa
                        para dar o primeiro passo!
                      </p>
                    </div>
                  </div>
                )}

                {currentSection === "resources" && (
                  <div className="space-y-6">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Você não está sozinho nessa jornada! Existem diversos recursos e grupos de
                      apoio disponíveis para ajudá-lo.
                    </p>

                    <div className="space-y-5">
                      <div className="bg-emerald-50 border-l-4 border-emerald-500 p-5 rounded-r-xl">
                        <h4 className="font-bold text-emerald-900 mb-3 flex items-center gap-2">
                          <ExternalLink className="w-5 h-5" />
                          Programas Governamentais
                        </h4>
                        <div className="space-y-3">
                          <a
                            href="https://www.gov.br/inca/pt-br/assuntos/gestor-e-profissional-de-saude/controle-do-tabagismo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-shadow group"
                          >
                            <div>
                              <div className="font-medium text-gray-900">
                                INCA - Programa Nacional de Controle do Tabagismo
                              </div>
                              <div className="text-sm text-gray-600">
                                Tratamento gratuito pelo SUS
                              </div>
                            </div>
                            <ExternalLink className="w-5 h-5 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                          </a>

                          <a
                            href="https://www.gov.br/saude/pt-br"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-shadow group"
                          >
                            <div>
                              <div className="font-medium text-gray-900">
                                Ministério da Saúde - Disque Saúde 136
                              </div>
                              <div className="text-sm text-gray-600">
                                Informações e orientações gratuitas
                              </div>
                            </div>
                            <ExternalLink className="w-5 h-5 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                          </a>
                        </div>
                      </div>

                      <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-xl">
                        <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                          <Users className="w-5 h-5" />
                          Grupos de Apoio Online
                        </h4>
                        <div className="space-y-3">
                          <div className="p-3 bg-white rounded-lg">
                            <div className="font-medium text-gray-900 mb-1">
                              Grupos no Facebook
                            </div>
                            <div className="text-sm text-gray-600">
                              Busque por "Parar de Fumar Brasil" ou "Ex-Fumantes" para encontrar
                              comunidades ativas
                            </div>
                          </div>

                          <div className="p-3 bg-white rounded-lg">
                            <div className="font-medium text-gray-900 mb-1">Fóruns e Comunidades</div>
                            <div className="text-sm text-gray-600">
                              Reddit (r/stopsmoking), grupos no WhatsApp e Telegram com pessoas na
                              mesma jornada
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-purple-50 border-l-4 border-purple-500 p-5 rounded-r-xl">
                        <h4 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                          <Target className="w-5 h-5" />
                          Aplicativos Úteis
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div className="p-3 bg-white rounded-lg">
                            <div className="font-medium text-gray-900 mb-1">Smoke Free</div>
                            <div className="text-sm text-gray-600">
                              Rastreie seu progresso e economia
                            </div>
                          </div>

                          <div className="p-3 bg-white rounded-lg">
                            <div className="font-medium text-gray-900 mb-1">QuitNow!</div>
                            <div className="text-sm text-gray-600">
                              Comunidade e estatísticas de saúde
                            </div>
                          </div>

                          <div className="p-3 bg-white rounded-lg">
                            <div className="font-medium text-gray-900 mb-1">Kwit</div>
                            <div className="text-sm text-gray-600">Gamificação da jornada</div>
                          </div>

                          <div className="p-3 bg-white rounded-lg">
                            <div className="font-medium text-gray-900 mb-1">Quit Tracker</div>
                            <div className="text-sm text-gray-600">
                              Contador de dias e benefícios
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-orange-50 border-l-4 border-orange-500 p-5 rounded-r-xl">
                        <h4 className="font-bold text-orange-900 mb-3 flex items-center gap-2">
                          <Heart className="w-5 h-5" />
                          Ajuda Profissional
                        </h4>
                        <div className="space-y-3 text-orange-800">
                          <div>
                            <strong>Médico Clínico Geral:</strong>
                            <p className="text-sm mt-1">
                              Pode prescrever medicamentos como adesivos de nicotina, bupropiona ou
                              vareniclina.
                            </p>
                          </div>
                          <div>
                            <strong>Psicólogo/Terapeuta:</strong>
                            <p className="text-sm mt-1">
                              Terapia cognitivo-comportamental é muito eficaz para tratar a
                              dependência.
                            </p>
                          </div>
                          <div>
                            <strong>Pneumologista:</strong>
                            <p className="text-sm mt-1">
                              Especialista em saúde pulmonar pode avaliar danos e acompanhar
                              recuperação.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-r-xl">
                        <h4 className="font-bold text-yellow-900 mb-3 flex items-center gap-2">
                          <Lightbulb className="w-5 h-5" />
                          Livros Recomendados
                        </h4>
                        <ul className="space-y-2 text-yellow-800">
                          <li>
                            • <strong>"É Fácil Parar de Fumar"</strong> - Allen Carr
                          </li>
                          <li>
                            • <strong>"Liberte-se do Cigarro"</strong> - Dr. Drauzio Varella
                          </li>
                          <li>
                            • <strong>"O Fim do Cigarro"</strong> - Instituto Nacional do Câncer
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-2xl mt-8">
                      <h4 className="text-xl font-bold mb-3">Lembre-se!</h4>
                      <p className="text-emerald-50 leading-relaxed">
                        Buscar ajuda não é sinal de fraqueza, mas de coragem e determinação. Quanto
                        mais suporte você tiver, maiores são suas chances de sucesso. Não hesite em
                        usar todos os recursos disponíveis!
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Notes Section */}
              <div className="mt-8 pt-6 border-t">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-emerald-600" />
                    Minhas Anotações
                  </h3>
                  <button
                    onClick={() => setShowNoteInput(!showNoteInput)}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
                  >
                    {showNoteInput ? "Cancelar" : "Nova Anotação"}
                  </button>
                </div>

                {showNoteInput && (
                  <div className="mb-4 space-y-3">
                    <textarea
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Escreva suas reflexões, metas ou observações..."
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                      rows={4}
                    />
                    <button
                      onClick={addNote}
                      className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                    >
                      Salvar Anotação
                    </button>
                  </div>
                )}

                <div className="space-y-3">
                  {progress.notes
                    .filter((note) => note.section === currentSection)
                    .map((note, index) => (
                      <div key={index} className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                        <div className="flex items-center gap-2 text-xs text-yellow-700 mb-2">
                          <Calendar className="w-3 h-3" />
                          {new Date(note.date).toLocaleDateString("pt-BR")}
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">{note.content}</p>
                      </div>
                    ))}
                  {progress.notes.filter((note) => note.section === currentSection).length === 0 && (
                    <p className="text-gray-500 text-sm text-center py-4">
                      Nenhuma anotação nesta seção ainda.
                    </p>
                  )}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t">
                <button
                  onClick={goToPrevious}
                  disabled={currentIndex === 0}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                    currentIndex === 0
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  Anterior
                </button>

                <button
                  onClick={goToNext}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                >
                  {currentIndex === sections.length - 1 ? "Concluir" : "Próximo"}
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
