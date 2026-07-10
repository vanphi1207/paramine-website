import React from "react";
import {
  Sword,
  Pickaxe,
  Users,
  Shield,
  Zap,
  Home,
  BookOpen,
  ShoppingBag,
  HelpCircle,
  Terminal,
  Flag,
  Star,
  Server,
  Trophy,
  Wrench,
} from "lucide-react";
import {
  StaffMember,
  WikiCategory,
  HistoryEvent,
  Feature,
  GalleryPeriod,
  GalleryImage,
} from "./types";

export const SERVER_IP = "rsvr1.hypercore.vn:30189";
export const DISCORD_LINK = "https://discord.gg/8rSsmdcDKm";
export const VOTE_LINK = "https://minecraft-mp.com/server/350613/vote/";
export const FACEBOOK_LINK =
  "https://www.facebook.com/profile.php?id=61575970920981";

export interface MusicTrack {
  name: string;
  url: string;
}

export const BACKGROUND_MUSIC_PLAYLIST: MusicTrack[] = [
  { name: "Track 1", url: "/music/track1.mp3" },
  { name: "Track 2", url: "/music/track2.mp3" },
  { name: "Track 3", url: "/music/track3.mp3" },
];

export const BACKGROUND_MUSIC_URL = BACKGROUND_MUSIC_PLAYLIST[0].url;

export const FEATURES: Feature[] = [
  {
    title: "Sinh Tồn Chill",
    description:
      "Trải nghiệm sinh tồn chân thực với độ khó cao, mob thông minh hơn và mạnh mẽ hơn",
    icon: Pickaxe,
    color: "text-emerald-400",
    details:
      "Hệ thống sinh tồn được tùy chỉnh sâu, cân bằng lại độ khó vanilla để mang lại thử thách thực sự nhưng vẫn giữ được sự thư giãn (chill) đúng tinh thần của Paramine. Mob được nâng cấp AI và chỉ số, đòi hỏi chiến thuật thay vì chỉ cày cấp.",
    highlights: [
      "Mob thông minh hơn với AI tùy chỉnh",
      "Hệ thống thời tiết & mùa ảnh hưởng gameplay",
      "Custom enchant và item độc quyền",
      "Land claim chống grief an toàn",
    ],
    stats: [
      { label: "Độ khó", value: "Hard+" },
      { label: "Custom Item", value: "30+" },
    ],
  },
  {
    title: "Hệ Thống Kinh Tế",
    description:
      "Làm giàu qua các công việc, giao dịch tự do và thị trường người chơi.",
    icon: Sword,
    color: "text-red-400",
    details:
      "Nền kinh tế server vận hành theo cơ chế cung-cầu thực sự do người chơi tạo ra, không có shop NPC ép giá. Người chơi có thể chọn nghề nghiệp, mở cửa hàng riêng và giao dịch tự do qua chợ trung tâm hoặc trực tiếp.",
    highlights: [
      "Hệ thống Job đa dạng: đào mỏ, săn bắn, nông trại...",
      "Chợ trung tâm (Auction House) giao dịch 24/7",
      "Cửa hàng cá nhân đặt tại thị trấn riêng",
      "Tiền tệ trong game liên kết vật phẩm thật",
    ],
    stats: [
      { label: "Nghề nghiệp", value: "10+" },
      { label: "Giao dịch/ngày", value: "500+" },
    ],
  },
  {
    title: "Hệ Thống Thị Trấn",
    description:
      "Tạo lập thị trấn, liên minh và chiến đấu để mở rộng lãnh thổ.",
    icon: Shield,
    color: "text-blue-400",
    details:
      "Lấy cảm hứng từ Towny/Factions, người chơi có thể cùng nhau xây dựng thị trấn, ký kết liên minh, tuyên chiến và mở rộng lãnh thổ. Mỗi thị trấn có ngân khố riêng, thuế thu từ thành viên và hệ thống cấp bậc rõ ràng.",
    highlights: [
      "Thành lập & quản lý thị trấn, liên minh (Nation)",
      "Chiến tranh lãnh thổ (Territory War) theo lịch",
      "Ngân khố thị trấn & thuế tự động",
      "Phân quyền thành viên theo cấp bậc",
    ],
    stats: [
      { label: "Thị trấn hoạt động", value: "20+" },
      { label: "Chiến sự/tuần", value: "3-5" },
    ],
  },
  {
    title: "Cộng Đồng Sôi Động",
    description: "Tham gia vào cộng đồng người chơi thân thiện và năng động.",
    icon: ShoppingBag,
    color: "text-yellow-400",
    details:
      "Paramine không chỉ là một máy chủ, mà là một cộng đồng gắn kết với các sự kiện thường xuyên, đội ngũ quản trị luôn túc trực hỗ trợ và văn hóa chơi game lành mạnh, thân thiện với người mới.",
    highlights: [
      "Sự kiện & minigame hàng tuần có phần thưởng",
      "Đội ngũ Staff hỗ trợ nhanh qua Discord",
      "Cộng đồng thân thiện, chào đón người mới",
      "Kênh chia sẻ build, thành tựu người chơi",
    ],
    stats: [
      { label: "Sự kiện/tháng", value: "8+" },
      { label: "Thành viên Discord", value: "1000+" },
    ],
  },
];

export const STAFF_MEMBERS: StaffMember[] = [
  {
    id: "1",
    name: "#1",
    role: "Owner",
    description: "Người sáng lập Paramine.",
    avatarUrl: "https://minotar.net/helm/TenTen/100.png",
    username: "TenTen",
    contact: "TenTen",
  },
  {
    id: "2",
    name: "#2",
    role: "Admin",
    description: "Quản lý kĩ thuật máy chủ và cộng đồng.",
    avatarUrl: "https://minotar.net/helm/qwcankk/100.png",
    username: "qwcankk",
    contact: "qwcankk",
  },
  {
    id: "3",
    name: "#3",
    role: "Developer",
    description: "Phát triển plugin riêng và tối ưu hóa máy chủ.",
    avatarUrl: "https://minotar.net/helm/MHF_Enderman/100.png",
    username: "MHF_Enderman",
    contact: "chưa rõ",
  },
  {
    id: "4",
    name: "_AnhKeu_",
    role: "Builder",
    description: "Kiến trúc sư trưởng, người tạo ra spawn và các map sự kiện.",
    avatarUrl: "https://minotar.net/helm/_AnhKeu_/100.png",
    username: "_AnhKeu_",
    contact: "chưa rõ",
  },
  {
    id: "5",
    name: "#5",
    role: "Moderator",
    description: "Giữ gìn trật tự chat và xử lý báo cáo hack.",
    avatarUrl: "https://minotar.net/helm/MHF_Blaze/100.png",
    username: "MHF_Blaze",
    contact: "chưa rõ",
  },
  {
    id: "6",
    name: "#6",
    role: "Helper",
    description: "Hỗ trợ người chơi mới làm quen với máy chủ.",
    avatarUrl: "https://minotar.net/helm/MHF_Pig/100.png",
    username: "MHF_Pig",
    contact: "chưa rõ",
  },
];

export const HISTORY_EVENTS: HistoryEvent[] = [
  {
    year: "22/11/2025 - Hiện tại",
    title: "Season 3: Khởi Đầu Mới",
    description:
      "Cập nhật phiên bản 1.21.8, mở rộng thế giới và đổi mới máy chủ",
    icon: Zap,
  },
  {
    year: "T5/2025",
    title: "Cột mốc 40 Người chơi",
    description:
      "Đạt kỷ lục người chơi đồng thời lên tổng số 40 người online cùng lúc",
    icon: Trophy,
  },
  {
    year: "T4/2025",
    title: "Season 2: Đổi mới toàn diện",
    description:
      "Thay đổi hoàn toàn hệ thống kinh tế, giới thiệu chợ đen và đấu giá.",
    icon: ShoppingBag,
  },
  {
    year: "T2/2025",
    title: "Thành lập Paramine",
    description: "Máy chủ chính thức mở cửa với chế độ Towny.",
    icon: Flag,
  },
];

export const WIKI_DATA: WikiCategory[] = [
  {
    id: "getting-started",
    title: "Bắt đầu",
    icon: Home,
    sections: [
      {
        id: "connect",
        title: "Cách tham gia",
        content: (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Kết nối Server</h3>
            <p>
              Để tham gia Paramine, bạn cần có Minecraft phiên bản 1.20 trở lên.
            </p>
            <ol className="list-decimal list-inside space-y-2 text-slate-300">
              <li>Mở Minecraft Launcher.</li>
              <li>Chọn Multiplayer {">"} Add Server.</li>
              <li>
                Nhập tên Server:{" "}
                <span className="font-bold text-emerald-400">Paramine</span>.
              </li>
              <li>
                Nhập Server Address:{" "}
                <code className="bg-slate-800 px-2 py-1 rounded text-emerald-300">
                  Paramine.fun
                </code>
                .
              </li>
              <li>Nhấn Done và tham gia!</li>
            </ol>
          </div>
        ),
      },
      {
        id: "rules",
        title: "Quy định",
        content: (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Nội quy Server</h3>
            <ul className="list-disc list-inside space-y-2 text-slate-300">
              <li>
                <span className="text-red-400 font-bold">Cấm Hack/Cheat:</span>{" "}
                Sử dụng client hack sẽ bị ban vĩnh viễn.
              </li>
              <li>
                <span className="text-yellow-400 font-bold">Văn hóa chat:</span>{" "}
                Không spam, chửi thề, xúc phạm người khác.
              </li>
              <li>
                <span className="text-blue-400 font-bold">Griefing:</span> Không
                phá hoại công trình của người khác (trừ khi có chiến tranh
                Clan).
              </li>
              <li>
                <span className="text-purple-400 font-bold">Bug Abuse:</span>{" "}
                Báo cáo lỗi ngay lập tức, không lạm dụng.
              </li>
            </ul>
          </div>
        ),
      },
    ],
  },
  {
    id: "commands",
    title: "Lệnh cơ bản",
    icon: Terminal,
    sections: [
      {
        id: "general-cmds",
        title: "Lệnh chung",
        content: (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">
              Danh sách lệnh thường dùng
            </h3>
            <div className="grid gap-2">
              <div className="bg-slate-900 p-3 rounded border border-slate-700">
                <code className="text-emerald-400 font-bold">/spawn</code>
                <p className="text-sm text-slate-400 mt-1">
                  Quay về sảnh chờ chính.
                </p>
              </div>
              <div className="bg-slate-900 p-3 rounded border border-slate-700">
                <code className="text-emerald-400 font-bold">
                  /sethome [tên]
                </code>
                <p className="text-sm text-slate-400 mt-1">
                  Đặt điểm nhà tại vị trí đứng.
                </p>
              </div>
              <div className="bg-slate-900 p-3 rounded border border-slate-700">
                <code className="text-emerald-400 font-bold">/home [tên]</code>
                <p className="text-sm text-slate-400 mt-1">
                  Dịch chuyển về nhà.
                </p>
              </div>
              <div className="bg-slate-900 p-3 rounded border border-slate-700">
                <code className="text-emerald-400 font-bold">
                  /tpa [tên_người_chơi]
                </code>
                <p className="text-sm text-slate-400 mt-1">
                  Yêu cầu dịch chuyển tới người khác.
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "land-cmds",
        title: "Lệnh đất đai",
        content: (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Bảo vệ lãnh thổ</h3>
            <p className="text-slate-300">
              Sử dụng Golden Shovel (Xẻng vàng) để claim đất.
            </p>
            <div className="bg-slate-900 p-3 rounded border border-slate-700">
              <code className="text-yellow-400 font-bold">/claim</code>
              <p className="text-sm text-slate-400 mt-1">
                Tạo vùng bảo vệ nhanh bán kính 10 block.
              </p>
            </div>
            <div className="bg-slate-900 p-3 rounded border border-slate-700">
              <code className="text-yellow-400 font-bold">/trust [tên]</code>
              <p className="text-sm text-slate-400 mt-1">
                Cho phép bạn bè xây dựng trong đất.
              </p>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: "economy",
    title: "Kinh tế",
    icon: ShoppingBag,
    sections: [
      {
        id: "money",
        title: "Kiếm tiền",
        content: (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">
              Cách kiếm tiền (Money)
            </h3>
            <p className="text-slate-300">
              Đơn vị tiền tệ chính:{" "}
              <span className="text-yellow-400">Money</span>.
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300">
              <li>Tham gia Job (/jobs) để lựa chọn nghề nghiệp và làm việc.</li>
              <li>Mua bán vật phẩm và làm giàu (/shop).</li>
              <li>Trao đổi, buôn bán với người chơi khác (/ah).</li>
              <li>Tham gia sự kiện hàng tuần.</li>
            </ul>
          </div>
        ),
      },
    ],
  },
];

export const GALLERY_PERIODS: GalleryPeriod[] = [
  { id: "khoi-dau", label: "Khởi Đầu (Mùa 1)" },
  { id: "phat-trien", label: "Phát Triển (Mùa 2)" },
  { id: "hien-tai", label: "Hiện Tại" },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 1,
    src: "https://i.ibb.co/yFkCQV0p/qc.png",
    alt: "Spawn Area",
    title: "Khu Vực Spawn Mới",
    description: "Trung tâm sảnh chờ của máy chủ Paramine",
    periodId: "hien-tai",
    featured: true,
  },
  {
    id: 2,
    src: "https://i.ibb.co/7t14Bpw6/base.png",
    alt: "Base của Member",
    title: "Base của Pika_Gon",
    description: "Hình ảnh base của một thành viên trong máy chủ Paramine",
    periodId: "phat-trien",
    featured: true,
  },
  {
    id: 3,
    src: "https://i.ibb.co/xZ53QXD/5.png",
    alt: "Survival World",
    title: "Thời Kì Đầu Của Paramine",
    description: "Thế giới sinh tồn đẹp mắt và hoang sơ của Paramine",
    periodId: "khoi-dau",
    featured: true,
  },
  {
    id: 4,
    src: "https://i.ibb.co/0pYVtN5B/2025-11-23-14-33-24-Copy.png",
    alt: "Event Câu Cá",
    title: "Event Câu Cá",
    description: "Thử thách kĩ năng câu cá với phần thưởng lớn",
    periodId: "phat-trien",
    featured: true,
  },
  {
    id: 5,
    src: "https://i.ibb.co/F4FcMDRf/item.png",
    alt: "Hệ thống Trade",
    title: "Hệ thống Trade của Paramine",
    description:
      "Hệ thống trao đổi vật phẩm đa dạng và phong phú trong Paramine",
    periodId: "phat-trien",
    featured: true,
  },
  {
    id: 6,
    src: "https://i.ibb.co/tMYdbxpr/mem.jpg",
    alt: "Mem Para",
    title: "Thời Kì Đầu Của Paramine",
    description: "Những người chơi của Paramine trong giai đoạn đầu tiên",
    periodId: "khoi-dau",
    featured: true,
  },
];
