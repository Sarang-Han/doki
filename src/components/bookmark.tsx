'use client'

import React, { useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Twitter, Instagram, PlusCircle, Search, Settings, ChevronRight, Home, BookOpen, Filter } from 'lucide-react'
import Link from 'next/link'
import { CollectionCard } from "@/components/ui/collection-card"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { ErrorBoundary } from 'react-error-boundary'

export type Collection = {
    id: string;
    title: string;
    image: string;
    tags: string[];
    itemCount: number;
  }

  export const collections: Collection[] = [
    {
      id: '1',
      title: '조코비치 하이라이트',
      image: '/pch.png',
      tags: ['선수', '하이라이트', 'ATP'],
      itemCount: 12
    },
    {
      id: '2',
      title: '테니스 라켓 정보',
      image: '/pch.png',
      tags: ['장비', '리뷰', '정보'],
      itemCount: 5
    },
    {
      id: '3',
      title: '선수 인터뷰 모음',
      image: '/pch.png',
      tags: ['인터뷰', 'ATP', 'WTA'],
      itemCount: 8
    },
  ];

// 샘플 데이터
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

export function Bookmark() {
  const [openInterests, setOpenInterests] = useState<number[]>([])
  
  const toggleInterest = (id: number) => {
    setOpenInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <div className="flex h-screen bg-background">
        {/* 왼쪽 사이드바 */}
        <aside className="w-80 border-r flex flex-col">
          <div className="p-6 border-b text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarImage src="/cat.jpg" alt="이화연" />
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
              <Link href="/search">
                <Button variant="ghost" size="sm">
                  <Search className="h-5 w-5 mr-2" />
                  검색
                </Button>
              </Link>
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
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">컬렉션</h2>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    필터
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="border border-dashed rounded-lg overflow-hidden flex flex-col hover:bg-accent/50 cursor-pointer transition-colors">
                  <div className="flex-1 flex flex-col items-center justify-center p-4">
                    <PlusCircle className="h-8 w-8 mb-2" />
                    <span className="text-sm font-medium">새 컬렉션 만들기</span>
                  </div>
                </div>
                
                {collections.map((collection) => (
                  <CollectionCard key={collection.id} collection={collection} />
                ))}
              </div>
            </div>
          </ScrollArea>
        </main>
      </div>
    </ErrorBoundary>
  )
}