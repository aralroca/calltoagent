---
title: "Why we built CallToAgent: Replacing 'hold' music with instant AI resolution"
date: "2024-03-21"
excerpt: "We were tired of robotic voice agents that couldn't actually 'do' anything. So we built an infrastructure that connects directly to your business tools."
author: "Aral Roca"
category: "Startup"
image: "/blog/introducing-calltoagent.jpg"
---

# Why we built CallToAgent: Replacing 'hold' music with instant AI resolution

Hey Indie Hackers,

I’m Aral, and like many of you, I’ve spent the last year obsessed with the potential of LLMs. But when it came to voice, something felt broken.

We’ve all seen the flashy demos of AI voices that sound human. But when you actually try to use them for a business—to book a real appointment at a clinic or check the status of a real order—they fail. Why? Because they are disconnected from the business logic.

## The "Context" Problem

Most voice agents are just a fancy wrapper around a text model. They can talk, but they can't *act*. 

If a patient calls a clinic, they don't want to hear "I'll have someone call you back." They want the appointment booked. Period. To do that, the agent needs to "see" the calendar.

## Building for the "Open Standard" (MCP)

When Anthropic released the **Model Context Protocol (MCP)**, we knew it was the missing piece. Instead of building messy, proprietary integrations for every single CRM and database, we decided to build an infrastructure that is **MCP-native from day one**.

This allows our agents to:
- Browse your real-time availability via Google Calendar.
- Look up orders in your specific SQL database.
- Update patient records in an EHR.

## Speed is a Feature

In voice, every millisecond counts. A 1-second pause feels like ages. We’ve fought hard to keep our roundtrip latency **under 600ms** (and often under 300ms) by co-locating our infrastructure near telephony PoPs.

## The Result

We’ve already seen a clinic in Madrid reduce their no-show rate by **40%** just by having the agent handle out-of-hours confirmations and re-bookings.

We are building CallToAgent to be the plumbing for the next generation of voice-first businesses. No more "press 1 for sales." Just instant resolution.

I’d love to hear your thoughts or if you’ve faced similar challenges with AI voice!

— Aral
