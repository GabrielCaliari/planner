import AsyncStorage from "@react-native-async-storage/async-storage";

const PREFIX = "@planner:test";

export type TestTripData = {
  destination: string;
  starts_at: string;
  ends_at: string;
};

export type TestActivity = {
  id: string;
  title: string;
  occurs_at: string;
};

export type TestLink = {
  id: string;
  title: string;
  url: string;
};

export type TestParticipant = {
  id: string;
  name: string;
  email: string;
  is_confirmed: boolean;
};

async function getJson<T>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

async function setJson(key: string, value: unknown): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function getTestTripData(tripId: string): Promise<TestTripData | null> {
  return getJson<TestTripData>(`${PREFIX}-trip:${tripId}`);
}

export async function setTestTripData(tripId: string, data: TestTripData): Promise<void> {
  await setJson(`${PREFIX}-trip:${tripId}`, data);
}

/** Formato por dia, igual ao que activities-server retorna */
export async function getTestActivities(tripId: string): Promise<{ date: string; activities: TestActivity[] }[]> {
  const stored = await getJson<{ date: string; activities: TestActivity[] }[]>(`${PREFIX}-activities:${tripId}`);
  return stored ?? [];
}

export async function addTestActivity(tripId: string, activity: Omit<TestActivity, "id">): Promise<TestActivity> {
  const list = await getTestActivities(tripId);
  const newActivity: TestActivity = { ...activity, id: "act-" + Date.now() };
  const dateStr = new Date(activity.occurs_at).toISOString().slice(0, 10);
  const day = list.find((d) => d.date === dateStr);
  if (day) {
    day.activities.push(newActivity);
  } else {
    list.push({ date: dateStr, activities: [newActivity] });
  }
  list.sort((a, b) => a.date.localeCompare(b.date));
  await setJson(`${PREFIX}-activities:${tripId}`, list);
  return newActivity;
}

export async function getTestLinks(tripId: string): Promise<TestLink[]> {
  const stored = await getJson<TestLink[]>(`${PREFIX}-links:${tripId}`);
  return stored ?? [];
}

export async function addTestLink(tripId: string, link: Omit<TestLink, "id">): Promise<TestLink> {
  const list = await getTestLinks(tripId);
  const newLink: TestLink = { ...link, id: "link-" + Date.now() };
  list.push(newLink);
  await setJson(`${PREFIX}-links:${tripId}`, list);
  return newLink;
}

export async function getTestParticipants(tripId: string): Promise<TestParticipant[]> {
  const stored = await getJson<TestParticipant[]>(`${PREFIX}-participants:${tripId}`);
  return stored ?? [];
}

export async function addTestParticipant(tripId: string, participant: Omit<TestParticipant, "id">): Promise<TestParticipant> {
  const list = await getTestParticipants(tripId);
  const newOne: TestParticipant = { ...participant, id: "part-" + Date.now() };
  list.push(newOne);
  await setJson(`${PREFIX}-participants:${tripId}`, list);
  return newOne;
}

export function isTestTripId(tripId: string): boolean {
  return tripId.startsWith("teste-");
}
