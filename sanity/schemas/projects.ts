
export default {
    name: 'project',
    type: 'document',
    title: 'Project',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Name'
      },
      {
        name: 'slug',
        type: 'slug',
        title: 'Slug of your blog article',
        // this add the generate slug from the title.
        options: {
          source:'name',
        }
      },
      {
        name: 'titleImage',
        type: 'image',
        title: 'Title Image'
      },
      {
        name: 'smallDescription',
        type: 'text',
        title: 'Small Description'
      },
      {
        name: 'content',
        type: 'array',
        title: 'Content',
        // that makes a big textarea for editing
        of: [
          {
            type: 'block'
          }
        ]
      }
    ]
  }

  // edit