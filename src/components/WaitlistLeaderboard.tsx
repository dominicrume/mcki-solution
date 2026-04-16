"use client";

import { useEffect, useState } from "react";
import { Trophy, Medal, Loader2, RefreshCw } from "lucide-react";
import { supabase } from "@/lib/supabase";

type LeaderEntry = {
  rank: number;
  referral_code: string;
  referral_count: number;
  queue_position: number;
};

// Simulated seed leaders shown when real DB data is absent
const SEED_LEADERS: LeaderEntry[] = [
  { rank: 1, referral_code: "MCKI-A7X2",  referral_count: 19, queue_position: 1  },
  { rank: 2, referral_code: "MCKI-B3F9",  referral_count: 14, queue_position: 2  },
  { rank: 3, referral_code: "MCKI-C6K1",  referral_count: 11, queue_position: 3  },
  { rank: 4, referral_code: "MCKI-D9R4",  referral_count: 8,  queue_position: 4  },
  { rank: 5, referral_code: "MCKI-E2M7",  referral_count: 6,  queue_position: 5  },
  { rank: 6, referral_code: "MCKI-F5W3",  referral_count: 5,  queue_position: 6  },
  { rank: 7, referral_code: "MCKI-G8T6",  referral_count: 4,  queue_position: 7  },
  { rank: 8, referral_code: "MCKI-H1N9",  referral_count: 3,  queue_position: 8  },
  { rank: 9, referral_code: "MCKI-J4P2",  referral_count: 2,  queue_position: 9  },
  { rank: 10, referral_code: "MCKI-K7Q5", referral_count: 1,  queue_position: 10 },
];

const rankBadge = (rank: number) => {
  if (rank === 1) return <Trophy size={16} className="text-yellow-500 fill-yellow-500" />;
  if (rank === 2) return <Medal size={16} className="text-slate-400 fill-slate-400" />;
  if (rank === 3) return <Medal size={16} className="text-amber-600 fill-amber-600" />;
  return <span className="w-4 text-center text-xs font-bold text-slate-400">{rank}</span>;
};

export function WaitlistLeaderboard() {
  const [entries, setEntries] = useState<LeaderEntry[]>(SEED_LEADERS);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchLeaderboard = async () => {
    if (!supabase) { setLoading(false); return; }
    setLoading(true);
    const { data, error } = await supabase
      .from("waitlist")
      .select("referral_code, referral_count, queue_position")
      .order("referral_count", { ascending: false })
      .order("queue_position", { ascending: true })
      .limit(10);

    if (!error && data && data.length > 0) {
      setEntries(
        data.map((row, idx) => ({
          rank: idx + 1,
          referral_code: row.referral_code,
          referral_count: row.referral_count,
          queue_position: row.queue_position,
        }))
      );
      setLastUpdated(new Date());
    }
    // If empty, keep SEED_LEADERS — they stay until real data arrives
    setLoading(false);
  };

  useEffect(() => {
    const client = supabase;
    if (!client) { setLoading(false); return; }
    fetchLeaderboard();

    const channel = client
      .channel("waitlist-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "waitlist" }, () => fetchLeaderboard())
      .subscribe();

    return () => { client.removeChannel(channel); };
  }, []);

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div className="bg-sapphire-500 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy size={18} className="text-gold-300" />
          <h3 className="font-heading font-semibold text-white text-sm">Referral Leaderboard</h3>
        </div>
        <button
          type="button"
          onClick={fetchLeaderboard}
          disabled={loading}
          className="text-sapphire-200 hover:text-white transition disabled:opacity-50"
          aria-label="Refresh leaderboard"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Table */}
      <div className="divide-y divide-brand-border">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={24} className="text-sapphire-300 animate-spin" />
          </div>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.referral_code}
              className={`flex items-center gap-4 px-5 py-3.5 ${entry.rank <= 3 ? "bg-gold-50" : "bg-white"}`}
            >
              <div className="w-5 flex items-center justify-center flex-shrink-0">
                {rankBadge(entry.rank)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-sm font-semibold text-sapphire-500 truncate">{entry.referral_code}</p>
                <p className="text-xs text-slate-400">Queue position #{entry.queue_position}</p>
              </div>
              <div className="text-right">
                <p className="font-heading font-bold text-sapphire-500">{entry.referral_count}</p>
                <p className="text-xs text-slate-400">referrals</p>
              </div>
              {entry.rank <= 3 && (
                <div className="ml-2">
                  <span className={`badge text-xs ${entry.rank === 1 ? "bg-gold-300 text-sapphire-500" : "badge-sapphire"}`}>
                    {entry.rank === 1 ? "Free Access" : entry.rank === 2 ? "50% Off" : "Priority"}
                  </span>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="px-5 py-2.5 bg-slate-50 border-t border-brand-border">
        <p className="text-xs text-slate-400">
          {lastUpdated
            ? `Updated ${lastUpdated.toLocaleTimeString("en-GB")} · Updates in real-time`
            : "Join & refer friends to claim a top spot"}
        </p>
      </div>
    </div>
  );
}
