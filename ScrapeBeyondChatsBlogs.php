
<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;
use GuzzleHttp\Client;
use Symfony\Component\DomCrawler\Crawler;
use App\Models\Article;

class ScrapeBeyondChatsBlogs extends Command
{
    protected $signature = 'scrape:beyondchats';
    protected $description = 'Scrape 5 oldest BeyondChats blog articles';

    public function handle()
    {
        $client = new Client();
        $response = $client->get('https://beyondchats.com/blogs/');
        $crawler = new Crawler($response->getBody()->getContents());

        $crawler->filter('article')->slice(-5)->each(function ($node) {
            Article::create([
                'title' => $node->filter('h2')->text(),
                'content' => 'Initial scraped content',
                'source_url' => $node->filter('a')->attr('href'),
                'type' => 'original'
            ]);
        });

        $this->info('Blogs scraped successfully');
    }
}
