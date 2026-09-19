import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabase";
import {
  DEFAULT_PROJECTS,
  DEFAULT_ARTICLES,
  DEFAULT_PROFILE,
  DEFAULT_EDUCATION,
  DEFAULT_EXPLORATIONS,
  loadFromStorage,
  saveToStorage,
  resetAllStorage,
} from "../lib/portfolioStorage";

const PortfolioDataContext = createContext(null);

const STORAGE_KEYS = {
  PROJECTS: "esha_portfolio_projects_v1",
  ARTICLES: "esha_portfolio_articles_v1",
  PROFILE: "esha_portfolio_profile_v1",
  EDUCATION: "esha_portfolio_education_v1",
  EXPLORATIONS: "esha_portfolio_explorations_v1",
};

export function PortfolioDataProvider({ children }) {
  const [projects, setProjects] = useState(() =>
    loadFromStorage(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS)
  );

  const [articles, setArticles] = useState(() =>
    loadFromStorage(STORAGE_KEYS.ARTICLES, DEFAULT_ARTICLES)
  );

  const [profile, setProfile] = useState(() =>
    loadFromStorage(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE)
  );

  const [education, setEducation] = useState(() =>
    loadFromStorage(STORAGE_KEYS.EDUCATION, DEFAULT_EDUCATION)
  );

  const [explorations, setExplorations] = useState(() =>
    loadFromStorage(STORAGE_KEYS.EXPLORATIONS, DEFAULT_EXPLORATIONS)
  );

  // Sync initial fetch from Supabase if configured
  useEffect(() => {
    if (!supabase) return;

    async function fetchSupabaseData() {
      try {
        const { data: blogsData, error: blogsErr } = await supabase
          .from("blogs")
          .select("*")
          .order("created_at", { ascending: false });

        if (!blogsErr && blogsData && blogsData.length > 0) {
          const mapped = blogsData.map((b) => ({
            id: b.id.toString(),
            title: b.title,
            subtitle: b.subtitle || "",
            type: b.category || b.type || "Blogs",
            date: b.date || (b.created_at ? new Date(b.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Recent"),
            readTime: b.read_time || b.readTime || "5 min read",
            coverImage: b.image_url || b.coverImage || "",
            excerpt: b.excerpt || b.content?.slice(0, 120) || "",
            content: b.content || "",
          }));
          setArticles(mapped);
        }
      } catch (e) {
        console.info("Supabase articles sync fallback to local storage:", e);
      }

      try {
        const { data: expData, error: expErr } = await supabase
          .from("explorations")
          .select("*")
          .order("created_at", { ascending: false });

        if (!expErr && expData && expData.length > 0) {
          const mappedExp = expData.map((e) => ({
            id: e.id.toString(),
            title: e.title,
            category: e.category,
            badgeLabel: e.badge_label || e.badgeLabel,
            image: e.image,
            summary: e.summary,
            link: e.link,
            linkText: e.link_text || e.linkText,
            tags: Array.isArray(e.tags) ? e.tags : (e.tags ? e.tags.split(",") : []),
            accentColor: e.accent_color || e.accentColor || "butter",
            whyBuilt: e.why_built || e.whyBuilt || "",
            whatLearned: e.what_learned || e.whatLearned || "",
          }));
          setExplorations(mappedExp);
        }
      } catch (e) {
        console.info("Supabase explorations sync fallback to local storage:", e);
      }
    }

    fetchSupabaseData();
  }, []);

  // Sync mutations to storage
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.PROJECTS, projects);
  }, [projects]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.ARTICLES, articles);
  }, [articles]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.PROFILE, profile);
  }, [profile]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.EDUCATION, education);
  }, [education]);

  // Projects CRUD
  const addProject = (newProj) => {
    const item = { ...newProj, id: `proj_${Date.now()}` };
    setProjects((prev) => [item, ...prev]);
  };

  const updateProject = (id, updatedFields) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // Articles / Commercial Work CRUD
  const addArticle = async (newArt) => {
    const item = { ...newArt, id: `art_${Date.now()}` };
    setArticles((prev) => [item, ...prev]);

    // Optional Supabase DB Sync
    if (supabase) {
      try {
        await supabase.from("blogs").insert([
          {
            title: item.title,
            subtitle: item.subtitle,
            category: item.type,
            type: item.type,
            content: item.content,
            excerpt: item.excerpt,
            image_url: item.coverImage,
            read_time: item.readTime,
            date: item.date,
          },
        ]);
      } catch (err) {
        console.warn("Supabase insert warning:", err);
      }
    }
  };

  const updateArticle = async (id, updatedFields) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updatedFields } : a))
    );

    if (supabase) {
      try {
        await supabase
          .from("blogs")
          .update({
            title: updatedFields.title,
            subtitle: updatedFields.subtitle,
            category: updatedFields.type,
            type: updatedFields.type,
            content: updatedFields.content,
            excerpt: updatedFields.excerpt,
            image_url: updatedFields.coverImage,
            read_time: updatedFields.readTime,
            date: updatedFields.date,
          })
          .eq("id", id);
      } catch (err) {
        console.warn("Supabase update warning:", err);
      }
    }
  };

  const deleteArticle = async (id) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));

    if (supabase) {
      try {
        await supabase.from("blogs").delete().eq("id", id);
      } catch (err) {
        console.warn("Supabase delete warning:", err);
      }
    }
  };

  // Explorations CRUD
  const addExploration = async (newExp) => {
    const item = { ...newExp, id: `exp_${Date.now()}` };
    setExplorations((prev) => [item, ...prev]);

    if (supabase) {
      try {
        await supabase.from("explorations").insert([
          {
            title: item.title,
            category: item.category,
            badge_label: item.badgeLabel,
            image: item.image,
            summary: item.summary,
            link: item.link,
            link_text: item.linkText,
            tags: item.tags,
            accent_color: item.accentColor,
            why_built: item.whyBuilt,
            what_learned: item.whatLearned,
          },
        ]);
      } catch (err) {
        console.warn("Supabase exploration insert fallback:", err);
      }
    }
  };

  const updateExploration = async (id, updatedFields) => {
    setExplorations((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updatedFields } : e))
    );

    if (supabase) {
      try {
        await supabase
          .from("explorations")
          .update({
            title: updatedFields.title,
            category: updatedFields.category,
            badge_label: updatedFields.badgeLabel,
            image: updatedFields.image,
            summary: updatedFields.summary,
            link: updatedFields.link,
            link_text: updatedFields.linkText,
            tags: updatedFields.tags,
            accent_color: updatedFields.accentColor,
            why_built: updatedFields.whyBuilt,
            what_learned: updatedFields.whatLearned,
          })
          .eq("id", id);
      } catch (err) {
        console.warn("Supabase exploration update fallback:", err);
      }
    }
  };

  const deleteExploration = async (id) => {
    setExplorations((prev) => prev.filter((e) => e.id !== id));

    if (supabase) {
      try {
        await supabase.from("explorations").delete().eq("id", id);
      } catch (err) {
        console.warn("Supabase exploration delete fallback:", err);
      }
    }
  };

  // Profile Update
  const updateProfile = (fields) => {
    setProfile((prev) => ({ ...prev, ...fields }));
  };

  // Education CRUD
  const addEducation = (newEdu) => {
    const item = { ...newEdu, id: `edu_${Date.now()}` };
    setEducation((prev) => [item, ...prev]);
  };

  const deleteEducation = (id) => {
    setEducation((prev) => prev.filter((e) => e.id !== id));
  };

  const resetAllData = () => {
    resetAllStorage();
    setProjects(DEFAULT_PROJECTS);
    setArticles(DEFAULT_ARTICLES);
    setProfile(DEFAULT_PROFILE);
    setEducation(DEFAULT_EDUCATION);
    setExplorations(DEFAULT_EXPLORATIONS);
  };

  return (
    <PortfolioDataContext.Provider
      value={{
        projects,
        articles,
        profile,
        education,
        explorations,
        addProject,
        updateProject,
        deleteProject,
        addArticle,
        updateArticle,
        deleteArticle,
        updateProfile,
        addEducation,
        deleteEducation,
        addExploration,
        updateExploration,
        deleteExploration,
        resetAllData,
      }}
    >
      {children}
    </PortfolioDataContext.Provider>
  );
}

export function usePortfolioData() {
  const context = useContext(PortfolioDataContext);
  if (!context) {
    throw new Error("usePortfolioData must be used within PortfolioDataProvider");
  }
  return context;
}
