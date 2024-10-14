import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'profile',
  type: 'document',
  title: 'Profile',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      name: 'description',
      type: 'array',
      title: 'Description',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'quote',
      type: 'text',
      title: 'Quote',
    }),
    defineField({
      name: 'profileImage1',
      type: 'image',
      title: 'Profile Image',
    }),
    defineField({
      name: 'profileImage2',
      type: 'image',
      title: 'Profile Image',
    }),
    defineField({
      name: 'profileImage3',
      type: 'image',
      title: 'TProfile Image',
    }),
    defineField({
      name: 'extraImage',
      type: 'image',
      title: 'Extra image',
    }),
    defineField({
      name: 'frontendTechs',
      type: 'array',
      title: 'Fronteng Techs',
      of: [defineArrayMember({type: 'string'})],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'backendTechs',
      type: 'array',
      title: 'Backend Techs',
      of: [defineArrayMember({type: 'string'})],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'generalTechs',
      type: 'array',
      title: 'General Techs',
      of: [defineArrayMember({type: 'string'})],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'githubProfile',
      type: 'url',
      title: 'Github Link',
    }),
    defineField({
      name: 'linkedinProfile',
      type: 'url',
      title: 'Linkedin Link',
    }),
    defineField({
      name: 'instagramProfile',
      type: 'url',
      title: 'Instagram Link',
    }),
    defineField({
      name: 'portfolioProfile',
      type: 'url',
      title: 'Portfolio Link',
    }),

    defineField({
      name: 'active',
      type: 'boolean',
      title: 'Is active?',
    }),
  ],
})
