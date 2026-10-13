
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

const MAX_FILE_SIZE = 50 * 1024 * 1024;

const PLAYERS = {
  messi: "لیونل مسی",
  ronaldo: "کریستیانو رونالدو",
  neymar: "نیمار",
  mbappe: "کیلیان امباپه",
  haaland: "ارلینگ هالند",
  bellingham: "جود بلینگام"
};

function showStatus(message) {
  if (statusText) {
    statusText.textContent = message;
  }
}

function setAdminPanel(isAdmin) {
  if (uploadPanel) {
    uploadPanel.hidden = !isAdmin;
  }

  if (loginForm) {
    loginForm.hidden = isAdmin;
  }
}

function makeElement(tag, text) {
  const element = document.createElement(tag);
  element.textContent = text ?? "";
  return element;
}

async function getAdmin() {
  const { data, error } = await supabaseClient.auth.getUser();

  if (error) throw error;

  if (!data.user || data.user.id !== ADMIN_UID) {
    throw new Error("دسترسی مدیر تأیید نشد. دوباره وارد شو.");
  }

  return data.user;
}

function getStoragePath(videoUrl) {
  const url = new URL(videoUrl);
  const expectedOrigin = new URL(SUPABASE_URL).origin;
  const prefix = "/storage/v1/object/public/videos/";

  if (
    url.origin !== expectedOrigin ||
    !url.pathname.startsWith(prefix)
  ) {
    throw new Error("لینک فایل ویدیو معتبر نیست.");
  }

  const encodedPath = url.pathname.slice(prefix.length);

  try {
    return encodedPath
      .split("/")
      .map((part) => decodeURIComponent(part))
      .join("/");
  } catch {
    throw new Error("مسیر فایل ویدیو معتبر نیست.");
  }
}

function showVideoError(message) {
  if (!videoList) return;

  videoList.replaceChildren(makeElement("p", message));
}

async function loadVideos() {
  if (!videoList) return;

  videoList.replaceChildren(
    makeElement("p", "در حال بارگذاری ویدیوها...")
  );

  try {
    await getAdmin();

    const { data: videos, error } = await supabaseClient
      .from("videos")
      .select("id, title, player, video_url, created_at")
      .order("created_at", { ascending: false });

    if (error) throw error;

    videoList.replaceChildren();

    if (!videos || videos.length === 0) {
      videoList.appendChild(
        makeElement("p", "هنوز ویدیویی منتشر نشده است.")
      );
      return;
    }

    for (const video of videos) {
      const card = document.createElement("article");

      card.style.padding = "12px";
      card.style.margin = "12px 0";
      card.style.border = "1px solid #777";
      card.style.borderRadius = "10px";

      const title = makeElement("h3", video.title || "بدون عنوان");

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
        const confirmed = confirm(
          "ویدیوی «" + (video.title || "بدون عنوان") +
          "» حذف شود؟"
        );

        if (!confirmed) return;

        deleteButton.disabled = true;
        showStatus("در حال حذف ویدیو...");

        try {
          await getAdmin();

          const path = getStoragePath(video.video_url);

          // ابتدا فایل را از Storage حذف می‌کنیم.
          const { error: storageError } = await supabaseClient
            .storage
            .from("videos")
            .remove([path]);

          if (storageError) throw storageError;

          // سپس رکورد ویدیو را از دیتابیس حذف می‌کنیم.
          const { data: deleted, error: dbError } =
            await supabaseClient
              .from("videos")
              .delete()
              .eq("id", video.id)
              .select("id");

          if (dbError) {
            throw new Error(
              "فایل حذف شد، اما رکورد دیتابیس حذف نشد: " +
              dbError.message
            );
          }

          if (!deleted || deleted.length === 0) {
            throw new Error(
              "فایل حذف شد، اما اجازه حذف رکورد دیتابیس وجود نداشت."
            );
          }

          showStatus("ویدیو با موفقیت حذف شد.");
          await loadVideos();
        } catch (error) {
          console.error("Delete error:", error);
          showStatus("خطای حذف: " + error.message);
        } finally {
          deleteButton.disabled = false;
        }
      });

      card.append(title, player, link, deleteButton);
      videoList.appendChild(card);
    }
  } catch (error) {
    console.error("Load videos error:", error);

    showVideoError(
      "خطا در نمایش ویدیوها: " + error.message
    );
  }
}

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const button = loginForm.querySelector(
      'button[type="submit"]'
    );

    if (button) button.disabled = true;

    showStatus("در حال ورود...");

    try {
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;

      const { data, error } =
        await supabaseClient.auth.signInWithPassword({
          email,
          password
        });

      if (error) throw error;

      if (!data.user || data.user.id !== ADMIN_UID) {
        await supabaseClient.auth.signOut();

        throw new Error("این حساب اجازه ورود به پنل مدیریت را ندارد.");
      }

      setAdminPanel(true);
      showStatus("ورود موفق بود!");

      await loadVideos();
    } catch (error) {
      console.error("Login error:", error);
      setAdminPanel(false);
      showStatus("خطای ورود: " + error.message);
    } finally {
      if (button) button.disabled = false;
    }
  });
}

if (uploadForm) {
  uploadForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document
      .getElementById("video-title")
      .value.trim();

    const player = document
      .getElementById("video-player")
      .value;

    const file = document
      .getElementById("video-file")
      .files[0];

    const button = uploadForm.querySelector(
      'button[type="submit"]'
    );

    if (!title) {
      showStatus("عنوان ویدیو را وارد کن.");
      return;
    }

    if (!Object.prototype.hasOwnProperty.call(PLAYERS, player)) {
      showStatus("یک بازیکن معتبر انتخاب کن.");
      return;
    }

    if (!file) {
      showStatus("فایل ویدیو را انتخاب کن.");
      return;
    }

    if (!file.name.toLowerCase().endsWith(".mp4")) {
      showStatus("فقط فایل MP4 مجاز است.");
      return;
    }

    if (file.type && file.type !== "video/mp4") {
      showStatus("فرمت فایل باید MP4 باشد.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      showStatus("حجم فایل باید حداکثر ۵۰ مگابایت باشد.");
      return;
    }

    if (file.size === 0) {
      showStatus("فایل انتخاب‌شده خالی است.");
      return;
    }

    if (button) button.disabled = true;

    let uploadedPath = null;

    try {
      const user = await getAdmin();

      const safeName = file.name.replace(
        /[^a-zA-Z0-9._-]/g,
        "_"
      );

      uploadedPath =
        user.id + "/" + Date.now() + "-" + safeName;

      showStatus("در حال آپلود فایل ویدیو...");

      const { error: uploadError } = await supabaseClient
        .storage
        .from("videos")
        .upload(uploadedPath, file, {
          contentType: "video/mp4",
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: publicData } = supabaseClient
        .storage
        .from("videos")
        .getPublicUrl(uploadedPath);

      if (!publicData || !publicData.publicUrl) {
        throw new Error("لینک عمومی ویدیو ساخته نشد.");
      }

      showStatus("فایل آپلود شد؛ در حال ثبت اطلاعات...");

      const { error: insertError } = await supabaseClient
        .from("videos")
        .insert({
          title,
          player,
          video_url: publicData.publicUrl
        });

      if (insertError) throw insertError;

      uploadedPath = null;

      uploadForm.reset();

      showStatus("ویدیو با موفقیت منتشر شد!");

      await loadVideos();
    } catch (error) {
      console.error("Upload error:", error);

      // اگر فایل آپلود شده ولی ثبت اطلاعات شکست خورده،
      // تلاش می‌کنیم فایل اضافه را پاک کنیم.
      if (uploadedPath) {
        const { error: cleanupError } = await supabaseClient
          .storage
          .from("videos")
          .remove([uploadedPath]);

        if (cleanupError) {
          console.error("Cleanup error:", cleanupError);
        }
      }

      showStatus("خطای آپلود: " + error.message);
    } finally {
      if (button) button.disabled = false;
    }
  });
}

if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    try {
      const { error } = await supabaseClient.auth.signOut();

      if (error) throw error;

      setAdminPanel(false);

      if (uploadForm) uploadForm.reset();
      if (videoList) videoList.replaceChildren();

      showStatus("با موفقیت از حساب خارج شدی.");
    } catch (error) {
      console.error("Logout error:", error);
      showStatus("خطای خروج: " + error.message);
    }
  });
}

if (refreshButton) {
  refreshButton.addEventListener("click", async () => {
    refreshButton.disabled = true;

    try {
      await loadVideos();
    } finally {
      refreshButton.disabled = false;
    }
  });
}

async function initialize() {
  setAdminPanel(false);

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
    console.error("Initialization error:", error);
    setAdminPanel(false);
    showStatus("برای استفاده از پنل، وارد حساب مدیر شو.");
  }
}

initialize();
