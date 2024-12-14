'use client'

import React, { useState } from 'react'
import { ScrollArea} from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Twitter, Instagram, PlusCircle, Search, Settings, ChevronRight, Home, BookOpen, Filter } from 'lucide-react'
import Link from 'next/link'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Card, CardContent } from "@/components/ui/card"

const connectedAccounts = [
  { id: 1, name: 'Twitter', icon: Twitter },
  { id: 2, name: 'Instagram', icon: Instagram },
]

const interests = [
  {
    id: 1,
    name: '테니스',
    icon: '🎾',
    subscriptions: [
      { id: 101, name: 'Rafael Nadal', platform: 'Twitter' },
      { id: 102, name: 'Serena Williams', platform: 'Instagram' },
      { id: 103, name: 'Novak Djokovic', platform: 'Twitter' },
    ]
  },
  {
    id: 2,
    name: '요리',
    icon: '👨‍🍳',
    subscriptions: [
      { id: 201, name: 'Gordon Ramsay', platform: 'Twitter' },
      { id: 202, name: 'Jamie Oliver', platform: 'Instagram' },
      { id: 203, name: 'Maangchi', platform: 'YouTube' },
    ]
  },
  {
    id: 3,
    name: '여행',
    icon: '✈️',
    subscriptions: [
      { id: 301, name: 'Lonely Planet', platform: 'Twitter' },
      { id: 302, name: 'National Geographic', platform: 'Instagram' },
      { id: 303, name: 'Rick Steves', platform: 'YouTube' },
    ]
  },
]

// Sample data for new discoveries
const newDiscoveries = [
  { name: 'Roger Federer', handle: '@rogerfederer', image: '/placeholder.svg?height=100&width=100', followers: '8.5M' },
  { name: 'Naomi Osaka', handle: '@naomiosaka', image: '/placeholder.svg?height=100&width=100', followers: '1.2M' },
  { name: 'Andy Murray', handle: '@andy_murray', image: '/placeholder.svg?height=100&width=100', followers: '3.7M' },
  { name: 'Simona Halep', handle: '@Simona_Halep', image: '/placeholder.svg?height=100&width=100', followers: '1.5M' },
]

// Sample data for recommended posts
const recommendedPosts = [
  { author: 'Rafael Nadal', content: '오늘 훈련 끝! 다음 경기를 위해 열심히 준비 중입니다. 💪🎾 #NeverGiveUp', image: '/pch.png', likes: 50000, comments: 2000 },
  { author: 'Serena Williams', content: '새로운 테니스 컬렉션 출시! 여러분의 생각은 어떠신가요? 👗🎾', image: '/pch.png', likes: 75000, comments: 3500 },
  { author: 'Novak Djokovic', content: '팬 여러분과 함께한 즐거운 시간! 여러분의 지지에 감사드립니다. ❤️🙏', image: '/pch.png', likes: 100000, comments: 5000 },
  { author: 'Ashleigh Barty', content: '은퇴 후 첫 골프 대회! 새로운 도전을 시작합니다. ⛳️', image: '/pch.png', likes: 30000, comments: 1500 },
]

export function TennisDiscoveryComponent() {
  const [openInterests, setOpenInterests] = useState<number[]>([])
  const toggleInterest = (id: number) => {
    setOpenInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  return (
    <div className="flex h-screen bg-background">
      {/* 왼쪽 사이드바 (기존 코드 재사용) */}
      {/* 왼쪽 사이드바 */}
      <aside className="w-80 border-r flex flex-col">
          <div className="p-6 border-b text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="이화연" />
              <AvatarFallback>이화연</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold">이화연</h2>
            <p className="text-sm text-muted-foreground mb-2">@hwayeon</p>
            <p className="text-sm">테니스를 사랑하는 사람</p>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              <div>
                <h2 className="text-sm font-semibold mb-2">피드</h2>
                {interests.map((interest) => (
                  <Collapsible
                    key={interest.id}
                    open={openInterests.includes(interest.id)}
                    onOpenChange={() => toggleInterest(interest.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full justify-start mb-1">
                        <span className="mr-2">{interest.icon}</span>
                        {interest.name}
                        <ChevronRight className={`ml-auto h-4 w-4 transition-transform ${openInterests.includes(interest.id) ? 'rotate-90' : ''}`} />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      {interest.subscriptions.map((sub) => (
                        <Button key={sub.id} variant="ghost" className="w-full justify-start mb-1 pl-8">
                          {sub.name}
                          <span className="ml-auto text-xs text-muted-foreground">{sub.platform}</span>
                        </Button>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
                <Button variant="outline" className="w-full justify-start mt-2">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  그룹 추가
                </Button>
              </div>

              <Separator />

              <div>
                <h2 className="text-sm font-semibold mb-2">발견</h2>
                <div className="space-y-2">
                <Link href="/tennis-discovery">
                <Button variant="ghost" className="w-full justify-start">
                  <span className="mr-2">🎾</span>
                  테니스
                </Button>
                </Link>
                  <Button variant="outline" className="w-full justify-start">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    주제 추가
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <h2 className="text-sm font-semibold mb-2">연동된 계정</h2>
                {connectedAccounts.map((account) => (
                  <Button key={account.id} variant="ghost" className="w-full justify-start mb-1">
                    <account.icon className="mr-2 h-4 w-4" />
                    {account.name}
                  </Button>
                ))}
                <Button variant="outline" className="w-full justify-start mt-2">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  계정 연동
                </Button>
              </div>
            </div>
          </ScrollArea>
      </aside>

      {/* 오른쪽 메인 컨텐츠 */}
      <main className="flex-1 overflow-hidden flex flex-col">
        <header className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center space-x-4">
        <Link href="/">
          <img src="https://i.imgur.com/ybqGyvO.png" alt="Doki Logo" className="h-9 w-17 cursor-pointer" />
        </Link>
       </div>
          <nav className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Home className="h-5 w-5 mr-2" />
              홈
            </Button>
            <Button variant="ghost" size="sm">
              <Search className="h-5 w-5 mr-2" />
              검색
            </Button>
            <Button variant="ghost" size="sm">
              <BookOpen className="h-5 w-5 mr-2" />
              북마크
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-5 w-5 mr-2" />
              설정
            </Button>
          </nav>
        </header>
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">새로운 발견</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {newDiscoveries.map((account) => (
                  <Card key={account.handle}>
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center space-y-3">
                        <Avatar className="w-20 h-20">
                          <AvatarImage src={account.image} alt={account.name} />
                          <AvatarFallback>{account.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="text-center">
                          <h3 className="font-semibold">{account.name}</h3>
                          <p className="text-sm text-muted-foreground">{account.handle}</p>
                          <p className="text-sm text-muted-foreground">{account.followers} followers</p>
                        </div>
                        <Button className="w-full">팔로우</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">추천 게시물</h2>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      필터
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>최신순</DropdownMenuItem>
                    <DropdownMenuItem>인기순</DropdownMenuItem>
                    <DropdownMenuItem>관련성순</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendedPosts.map((post, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4 mb-4">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${post.author[0]}`} alt={post.author} />
                          <AvatarFallback>{post.author[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{post.author}</p>
                          <p className="text-sm text-muted-foreground">2시간 전</p>
                        </div>
                      </div>
                      <img src={post.image} alt="Post content" className="w-full h-48 object-cover rounded-md mb-4" />
                      <p className="mb-4">{post.content}</p>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{post.likes.toLocaleString()} likes</span>
                        <span>{post.comments.toLocaleString()} comments</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </ScrollArea>
      </main>
    </div>
  )
}