
const SUPABASE_URL = "https://prgdwprzvgtrlkemmuoc.supabase.co";
const SUPABASE_KEY = "sb_publishable_0y5J9h5NnN-7G0rtsG_RTA_xo4mFP8T";
const ADMIN_UID = "68e1efe1-dcce-4e9b-a1bf-e0312c0dcce1";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const loginForm = document.getElementById("login-form");
const uploadForm = document.getElementById("upload-form");
const uploadPanel = document.getElementById("upload-panel");
const statusText = document.getElementById("status");
const logoutButton = document.getElementById("logout-button");
const refreshButton = document.getElementById("refresh-videos");
const videoList = document.getElementById("video-management-list");

const PLAYERS = {
  messi: "لیونل مسی",
  ronaldo: "کریستیانو رونالدو",
  neymar: "نیمار",
  mbappe: "کیلیان امباپه",
  haaland: "ارلینگ هالند",
  bellingham: "جود بلینگام"
};

function showStatus(message) {
  if (statusText) statusText.textContent = message;
}

function setAdminPanel(isAdmin) {
  if (uploadPanel) uploadPanel.hidden = !isAdmin;
  if (loginForm) loginForm.hidden = isAdmin;
}

async function getAdmin() {
  const { data, error } = await supabaseClient.auth.getUser();

  if (error) throw error;

  if (!data.user || data.user.id !== ADMIN_UID) {
    throw new Error("ابتدا وارد حساب مدیر شو.");
  }

  return data.user;
}

function getStoragePath(videoUrl) {
  const url = new URL(videoUrl);
  const prefix = "/storage/v1/object/public/videos/";

  if (
    url.origin !== new URL(SUPABASE_URL).origin ||
    !url.pathname.startsWith(prefix)
  ) {
    throw new Error("لینک فایل ویدیو معتبر نیست.");
  }

  return url.pathname
    .slice(prefix.length)
    .split("/")
    .map(decodeURIComponent)
    .join("/");
}

function makeElement(tag, text) {
  const element = document.createElement(tag);
  element.textContent = text;
  return element;
}

async function loadVideos() {
  if (!videoList) return;

  videoList.replaceChildren(makeElement("p", "در حال بارگذاری..."));

  try {
    await getAdmin();

    const { data: videos, error } = await supabaseClient
      .from("videos")
      .select("id, title, player, video_url, created_at")
      .order("created_at", { ascending: false });

    if (error) throw error;

    videoList.replaceChildren();

    if (!videos || videos.length === 0) {
      videoList.appendChild(makeElement("p", "هنوز ویدیویی منتشر نشده."));
      return;
    }

    for (const video of videos) {
      const card = document.createElement("article");
      card.style.padding = "12px";
      card.style.margin = "12px 0";
      card.style.border = "1px solid #777";
      card.style.borderRadius = "10px";

      const title = makeElement("h3", video.title);
      const player = makeElement(
        "p",
        "بازیکن: " + (PLAYERS[video.player] || "نامشخص")
      );

      const link = makeElement("a", "مشاهده ویدیو");
      link.href = video.video_url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      const deleteButton = makeElement("button", "حذف ویدیو");
      deleteButton.type = "button";

      deleteButton.addEventListener("click", async () => {
        if (!confirm("ویدیوی «" + video.title + "» حذف شود؟")) return;

        deleteButton.disabled = true;
        showStatus("در حال حذف ویدیو...");

        try {
          await getAdmin();

          const path = getStoragePath(video.video_url);

          const { error: storageError } = await supabaseClient.storage
            .from("videos")
            .remove([path]);

          if (storageError) throw storageError;

          const { data: deleted, error: dbError } = await supabaseClient
            .from("videos")
            .delete()
            .eq("id", video.id)
            .select("id");

          if (dbError) {
            throw new Error(
              "فایل حذف شد ولی اطلاعات دیتابیس حذف نشد: " +
              dbError.message
            );
          }

          if (!deleted || deleted.length === 0) {
            throw new Error("رکورد دیتابیس حذف نشد.");
          }

          showStatus("ویدیو حذف شد.");
          await loadVideos();
        } catch (error) {
          console.error(error);
          showStatus("خطای حذف: " + error.message);
        } finally {
          deleteButton.disabled = false;
        }
      });

      card.append(title, player, link, deleteButton);
      videoList.appendChild(card);
    }
  } catch (error) {
    console.error(error);
    videoList.replaceChildren(
      makeElement("p", "خطا در نمایش ویدیوها: " + error.message)
    );
  }
}

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const button = loginForm.querySelector('button[type="submit"]');
    button.disabled = true;
    showStatus("در حال ورود...");

    try {
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;

      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (error) throw error;

      if (!data.user || data.user.id !== ADMIN_UID) {
        await supabaseClient.auth.signOut();
        throw new Error("این حساب مدیر نیست.");
      }

      setAdminPanel(true);
      showStatus("ورود موفق بود.");
      await loadVideos();
    } catch (error) {
      console.error(error);
      showStatus("خطای ورود: " + error.message);
    } finally {
      button.disabled = false;
    }
  });
}

if (uploadForm) {
  uploadForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("video-title").value.trim();
    const player = document.getElementById("video-player").value;
    const file = document.getElementById("video-file").files[0];
    const button = uploadForm.querySelector('button[type="submit"]');

    if (!title) return showStatus("عنوان ویدیو را وارد کن.");
    if (!Object.prototype.hasOwnProperty.call(PLAYERS, player)) {
      return showStatus("بازیکن را انتخاب کن.");
    }
    if (!file) return showStatus("فایل ویدیو را انتخاب کن.");
    if (!file.name.toLowerCase().endsWith(".mp4")) {
      return showStatus("فقط فایل MP4 مجاز است.");
    }
    if (file.size > 50 * 1024 * 1024) {
      return showStatus("حجم فایل باید حداکثر ۵۰ مگابایت باشد.");
    }

    button.disabled = true;
    let path = null;

    try {
      const user = await getAdmin();
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      path = user.id + "/" + Date.now() + "-" + safeName;

      showStatus("در حال آپلود فایل...");

      const { error: uploadError } = await supabaseClient.storage
        .from("videos")
        .upload(path, file, {
          contentType: "video/mp4",
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: publicData } = supabaseClient.storage
        .from("videos")
        .getPublicUrl(path);

      const { error: insertError } = await supabaseClient
        .from("videos")
        .insert({
          title: title,
          player: player,
          video_url: publicData.publicUrl
        });

      if (insertError) {
        const { error: cleanupError } = await supabaseClient.storage
          .from("videos")
          .remove([path]);

        if (cleanupError) {
          console.error("Cleanup error:", cleanupError);
        }

        path = null;
        throw insertError;
      }

      path = null;
      uploadForm.reset();
      showStatus("ویدیو با موفقیت منتشر شد.");
      await loadVideos();
    } catch (error) {
      console.error(error);
      showStatus("خطای آپلود: " + error.message);
    } finally {
      button.disabled = false;
    }
  });
}

if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    try {
      const { error } = await supabaseClient.auth.signOut();
      if (error) throw error;

      setAdminPanel(false);
      showStatus("از حساب خارج شدی.");
      if (videoList) videoList.replaceChildren();
    } catch (error) {
      showStatus("خطای خروج: " + error.message);
    }
  });
}

if (refreshButton) {
  refreshButton.addEventListener("click", loadVideos);
}

async function initialize() {
  try {
    const { data, error } = await supabaseClient.auth.getUser();
    if (error) throw error;

    if (data.user && data.user.id === ADMIN_UID) {
      setAdminPanel(true);
      showStatus("خوش اومدی!");
      await loadVideos();
    } else {
      setAdminPanel(false);
    }
  } catch (error) {
    console.error(error);
    setAdminPanel(false);
    showStatus("خطای بررسی حساب: " + error.message);
  }
}

initialize();
