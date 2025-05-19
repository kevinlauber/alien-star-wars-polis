
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const Index = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<"es" | "en">("es");
  const [activeTab, setActiveTab] = useState("login");
  const [currentTranslations, setCurrentTranslations] = useState<Record<string, string>>({});

  const translations = {
    es: {
      newPlayer: "Nuevo Jugador",
      login: "Iniciar Sesión",
      register: "Registro",
      username: "Nombre",
      email: "E-mail",
      password: "Contraseña",
      forgotPassword: "¿Has olvidado la contraseña?",
      startPlaying: "Comenzar a Jugar",
      loginButton: "Iniciar Sesión",
      version: "Versión"
    },
    en: {
      newPlayer: "New Player",
      login: "Login",
      register: "Register",
      username: "Username",
      email: "E-mail",
      password: "Password",
      forgotPassword: "Forgot your password?",
      startPlaying: "Start Playing",
      loginButton: "Login",
      version: "Version"
    }
  };

  // Update translations whenever language changes
  useEffect(() => {
    setCurrentTranslations(translations[language]);
  }, [language]);

  // Handle language change
  const changeLanguage = (newLang: "es" | "en") => {
    setLanguage(newLang);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ 
          backgroundImage: "url('/lovable-uploads/62697cfa-48f3-458f-bb9c-8eb30cad0129.png')",
          backgroundSize: "contain",
          backgroundPosition: "center 30%",
          backgroundColor: "#0a1f35"
        }}
      ></div>
      
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
      
      {/* Language switcher */}
      <div className="absolute top-4 right-4 flex space-x-2 z-20">
        <button 
          className={`px-3 py-1.5 rounded ${language === 'es' ? 'bg-[#1d6eb7] text-white font-bold border-2 border-[#3498db]' : 'bg-gray-700 text-gray-300'}`}
          onClick={() => changeLanguage("es")}
        >
          ES
        </button>
        <button 
          className={`px-3 py-1.5 rounded ${language === 'en' ? 'bg-[#1d6eb7] text-white font-bold border-2 border-[#3498db]' : 'bg-gray-700 text-gray-300'}`}
          onClick={() => changeLanguage("en")}
        >
          EN
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-20">
        {/* Logo with better visibility */}
        <div className="w-full max-w-lg mb-6 relative">
          <div className="bg-black bg-opacity-50 rounded-lg p-2 mx-auto w-fit">
            <img 
              src="/starpolis-logo.png" 
              alt="Starpolis" 
              className="w-64 h-auto"
            />
          </div>
        </div>
        
        {/* Login/Register container */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-[#f3e9c6] border-4 border-[#c8b372] rounded-lg overflow-hidden shadow-lg">
            <div className="bg-[#2a4a7f] text-center py-3">
              <div className="mx-auto w-14 h-14 flex items-center justify-center bg-[#1a3057] rounded-full border-2 border-[#c8b372] -mt-6 mb-1">
                <span className="text-white text-2xl font-bold">S</span>
              </div>
            </div>
            
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab} 
              className="px-4 py-4"
            >
              <TabsList className="grid w-full grid-cols-2 bg-[#1a3057]">
                <TabsTrigger value="login" className="text-white data-[state=active]:bg-[#1d6eb7]">
                  {currentTranslations.login || translations.es.login}
                </TabsTrigger>
                <TabsTrigger value="register" className="text-white data-[state=active]:bg-[#1d6eb7]">
                  {currentTranslations.register || translations.es.register}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Input 
                      id="username" 
                      placeholder={currentTranslations.username || translations.es.username}
                      className="bg-[#fffbea] border-[#c8b372] pl-8"
                    />
                    <div className="absolute left-2 top-2.5 text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="relative">
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder={currentTranslations.password || translations.es.password}
                      className="bg-[#fffbea] border-[#c8b372] pl-8"
                    />
                    <div className="absolute left-2 top-2.5 text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </div>
                  </div>
                  
                  <div className="text-xs text-center">
                    <a href="#" className="text-[#1d6eb7] hover:underline">
                      {currentTranslations.forgotPassword || translations.es.forgotPassword}
                    </a>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-[#1d6eb7] hover:bg-[#165999] text-white border-2 border-[#165999]"
                  onClick={() => navigate('/city')}
                >
                  {currentTranslations.loginButton || translations.es.loginButton}
                </Button>
              </TabsContent>
              
              <TabsContent value="register" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Input 
                      id="reg-username" 
                      placeholder={currentTranslations.username || translations.es.username}
                      className="bg-[#fffbea] border-[#c8b372] pl-8"
                    />
                    <div className="absolute left-2 top-2.5 text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="relative">
                    <Input 
                      id="reg-email" 
                      type="email" 
                      placeholder={currentTranslations.email || translations.es.email}
                      className="bg-[#fffbea] border-[#c8b372] pl-8"
                    />
                    <div className="absolute left-2 top-2.5 text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="relative">
                    <Input 
                      id="reg-password" 
                      type="password" 
                      placeholder={currentTranslations.password || translations.es.password}
                      className="bg-[#fffbea] border-[#c8b372] pl-8"
                    />
                    <div className="absolute left-2 top-2.5 text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-[#1d6eb7] hover:bg-[#165999] text-white border-2 border-[#165999]"
                  onClick={() => navigate('/city')}
                >
                  {currentTranslations.startPlaying || translations.es.startPlaying}
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <div className="py-2 text-center text-sm text-white relative z-20">
        {currentTranslations.version || translations.es.version} 1.0.0
      </div>
    </div>
  );
};

export default Index;
