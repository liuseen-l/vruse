import contributors from './contributors.json'

export interface Contributor {
  name: string
  avatar: string
}

export interface CoreTeam {
  avatar: string
  name: string
  github: string
  twitter?: string
  sponsors?: boolean
  description: string
  packages?: string[]
  functions?: string[]
}

const contributorsAvatars: Record<string, string> = {}

const getAvatarUrl = (name: string) => `https://github.com/${name}.png`

const contributorList = (contributors as string[]).reduce((acc, name) => {
  contributorsAvatars[name] = getAvatarUrl(name)
  acc.push({ name, avatar: contributorsAvatars[name] })
  return acc
}, [] as Contributor[])

const coreTeamMembers: CoreTeam[] = [
  {
    avatar: contributorsAvatars['code-ManL'],
    name: 'LiuSeen',
    github: 'code-ManL',
    twitter: '--',
    sponsors: false,
    description:
      'Open source enthusiast<br/>loves new things<br/>is the founder of VRuse',
    packages: ['core'],
  },
  {
    avatar: contributorsAvatars.DimplesY,
    name: 'Jie',
    github: 'DimplesY',
    twitter: '--',
    sponsors: false,
    description: 'VRuse contributor',
    packages: ['core'],
  },
].sort(
  (pre, cur) =>
    contributors.findIndex((name) => name === pre.github) -
    contributors.findIndex((name) => name === cur.github),
)

export { coreTeamMembers, contributorList as contributors }
